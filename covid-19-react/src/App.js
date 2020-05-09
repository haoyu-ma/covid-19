import React, {PureComponent} from 'react'
import Highcharts from 'highcharts/highstock'
import MapChart from './components/Map'
import mapData from './data/mapData'
import {Collapse, Carousel, Spin, Row, Col, Statistic, Divider} from "antd";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar
} from 'recharts';
import 'antd/dist/antd.css';

require('highcharts/indicators/indicators')(Highcharts)
require('highcharts/indicators/pivot-points')(Highcharts)
require('highcharts/indicators/macd')(Highcharts)
require('highcharts/modules/exporting')(Highcharts)
require('highcharts/modules/map')(Highcharts)

const chartOptions = {
  title: {
    text: ''
  },
  series: [{
    data: [1, 2, 3],

  }]
}

class CustomizedAxisTick extends PureComponent {
  render() {
    const {
      x, y, stroke, payload,
    } = this.props;

    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="start" fill="#666"
              transform="rotate(0)">{payload.value.slice(0, 10)}</text>
      </g>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dimensions: {
        width: 400,
        height: 800,
      },
      options: {
        series: chartOptions.series
      },
      locations: [],
      mapSeriesData: [],
      summaryData: {
        activeCases: 0,
        combinedCases: 0,
        recoveredCases: 0,
        deaths: 0,
        combinedCasesNew: 0,
        recoveredCasesNew: 0,
        deathsNew: 0
      },
      summary: [],
    }
  }

  componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
    });
    fetch('http://192.168.30.105:8080/covid-19/nz/main')
      .then(response => response.json())
      .then(data => this.setState({
        locations: data.locations,
        mapSeriesData: data.locations.map(l => [l.name, l.active]),
        summaryData: data.summaryData,
        summary: data.summary,
      }));
  }

  render() {
    const {mapSeriesData, summaryData, dimensions, summary, locations} = this.state;

    const mapOptions = {
      title: {
        text: 'New Zealand COVID-19'
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#EFEFFF'],
          [0.67, '#4444FF'],
          [1, '#000022']
        ]
      },
      series: [{
        animation: {
          duration: 1000
        },
        mapData: mapData,
        dataLabels: {
          enabled: true,
          color: '#FFFFFF',
          format: '{point.code}'
        },
        name: 'Active Cases',
        data: mapSeriesData,
        tooltip: {
          pointFormat: '{point.name}: {point.value}'
        }
      }]
    }

    const {Panel} = Collapse;

    return (
      <div ref={el => (this.container = el)}>
        {mapSeriesData !== undefined && mapSeriesData.length > 0 ? (
          <div>
            <MapChart options={mapOptions} highcharts={Highcharts}/>
          </div>
        ) : (
          <div style={{
            height: 400,
            textAlign: 'center',
            background: 'rgba(0, 0, 0, 0.05)',
            borderRadius: 4,
            verticalAlign: 'middle'
          }}>
            <Spin style={{paddingTop: 190}}/>
          </div>
        )}
        <div style={{background: '#ececec', padding: 10, textAlign: 'center'}}>
          <Row gutter={6}>
            <Col span={6}>
              <Statistic title="Active"
                         value={summaryData.activeCases}
                         valueStyle={{color: '#cf1322'}}/>
            </Col>
            <Col span={6}>
              <Statistic title="Total"
                         value={summaryData.combinedCases}
                         valueStyle={{color: '#cf1322'}}
                         suffix={summaryData.combinedCasesNew >= 0 ? '+' + summaryData.combinedCasesNew : summaryData.combinedCasesNew}/>
            </Col>
            <Col span={6}>
              <Statistic title="Deaths"
                         value={summaryData.deaths}
                         valueStyle={{color: '#cf1322'}}
                         suffix={summaryData.deathsNew >= 0 ? '+' + summaryData.deathsNew : summaryData.deathsNew}/>
            </Col>
            <Col span={6}>
              <Statistic title="Recovered"
                         value={summaryData.recoveredCases}
                         valueStyle={{color: '#cf1322'}}
                         suffix={summaryData.recoveredCasesNew >= 0 ? '+' + summaryData.recoveredCasesNew : summaryData.recoveredCasesNew}/>
            </Col>
          </Row>
        </div>
        <div style={{background: 'rgb(236, 236, 236)'}}>
          <Carousel dotPosition={"left"} dots={{className: 'carousel-dots'}}>
            <div>
              <LineChart
                width={dimensions.width}
                height={300}
                data={summary}
                margin={{
                  top: 5, right: 35, left: 20, bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" tick={<CustomizedAxisTick/>}/>
                <YAxis/>
                <Tooltip />
                <Legend/>
                <Line type="basis" dataKey="combinedTotal" dot={false} stroke="blue"/>
                <Line type="basis" dataKey="recoveredTotal" dot={false} stroke="green"/>
                <Line type="basis" dataKey="deathsTotal" dot={false} stroke="black"/>
              </LineChart>
            </div>
            <div>
              <LineChart
                width={dimensions.width}
                height={300}
                data={summary}
                margin={{
                  top: 5, right: 35, left: 20, bottom: 5,
                }}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date" tick={<CustomizedAxisTick/>}/>
                <YAxis/>
                <Tooltip />
                <Legend/>
                <Line type="basis" dataKey="combined" dot={false} stroke="blue"/>
                <Line type="basis" dataKey="recovered" dot={false} stroke="green"/>
                <Line type="basis" dataKey="deaths" dot={false} stroke="black"/>
              </LineChart>
            </div>
          </Carousel>
        </div>
        <div>
          <Collapse accordion bordered={false}>
            {locations.map((item, index) => {
              return (
                <Panel key={index} header={item.name} style={{borderRadius: 2}} >
                  <div style={{textAlign: 'center'}}>
                    <Row gutter={6}>
                      <Col span={6}>
                        <Statistic title="Active"
                                   value={item.active}
                                   valueStyle={{color: '#cf1322'}}/>
                      </Col>
                      <Col span={6}>
                        <Statistic title="Total"
                                   value={item.totalCases}
                                   valueStyle={{color: '#cf1322'}}
                                   suffix={item.newCases >= 0 ? '+' + item.newCases : item.newCases}/>
                      </Col>
                      <Col span={6}>
                        <Statistic title="Deaths"
                                   value={item.deaths}
                                   valueStyle={{color: '#cf1322'}}/>
                      </Col>
                      <Col span={6}>
                        <Statistic title="recovered"
                                   value={item.recoveredCases}
                                   valueStyle={{color: '#cf1322'}}/>
                      </Col>
                    </Row>
                  </div>
                  <Divider>Age Groups</Divider>
                  <div style={{marginTop: 20}}>
                    <BarChart
                      width={dimensions.width}
                      height={300}
                      data={item.agesGenders}
                      margin={{
                        top: 5, right: 35, left: 20, bottom: 5,
                      }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="female" stackId="a" fill="#8884d8" />
                      <Bar dataKey="male" stackId="a" fill="#82ca9d" />
                    </BarChart>
                  </div>
                </Panel>
              )
            })}
          </Collapse>
        </div>
      </div>
    )
  }
}

export default App
