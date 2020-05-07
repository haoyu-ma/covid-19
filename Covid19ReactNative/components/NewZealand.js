import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView, {
  Callout,
  Marker,
  Polygon,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {Button, Flex, WingBlank} from '@ant-design/react-native';
import {LineChart, Grid, StackedBarChart} from 'react-native-svg-charts';
import Card from '@ant-design/react-native/es/card';
import Icon from '@ant-design/react-native/es/icon';
import Modal from 'react-native-modal';

export default class NewZealand extends React.Component<any, any> {
  constructor(props) {
    super(props);

    this.onModalClose = () => {
      this.setState({
        isShowModal: false,
      });
    };

    this.state = {
      data: '',
      isLoading: true,
      isShowModal: false,
      modalDetail: {},

      dashboardData: {
        activeCases: '0',
        combinedCases: '0',
        recoveredCases: '0',
        deaths: '0',
        newActiveCases: '0',
        combinedCasesNew: '0',
        recoveredCasesNew: '0',
        deathsNew: '0',
      },

      summaryData: {
        combined: [],
        recovered: [],
        deaths: [],
        combinedTotal: [],
        recoveredTotal: [],
        deathsTotal: [],
      },

      districtHealthBoardData: [
        {
          name: 'DHB Name',
          totalCases: 0,
          newCases: 0,
          active: 0,
          recovered: 0,
          deaths: 0,
          inHospital: 0,
          activeTrend: [],
          newTrend: [],
          totalTrend: [],
          deathsTrend: [],
          recoveredTrend: [],
          agesGenders: [],
        },
      ],

      districtHealthBoardDataMap: new Map(),
    };
  }

  componentDidMount() {
    fetch(serverIp + '/covid-19/nz/main')
      .then(response => response.json())
      .then(json => {
        let dhbMap = new Map();
        json.locations.map(function(item) {
          dhbMap.set(item.name, item);
        });
        this.setState({
          dashboardData: json.summaryData,
          summaryData: {
            combined: json.summary.map(item => item.combined),
            recovered: json.summary.map(item => item.recovered),
            deaths: json.summary.map(item => item.deaths),
            combinedTotal: json.summary.map(item => item.combinedTotal),
            recoveredTotal: json.summary.map(item => item.recoveredTotal),
            deathsTotal: json.summary.map(item => item.deathsTotal),
          },
          districtHealthBoardData: json.locations,
          districtHealthBoardDataMap: dhbMap,
        });
      })
      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const {
      dashboardData,
      summaryData,
      districtHealthBoardData,
      districtHealthBoardDataMap,
    } = this.state;

    return (
      <ScrollView
        style={{flex: 1}}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={true}>
        <View style={mapStyles.container}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={mapStyles.map}
            initialRegion={{
              latitude: -40.950433,
              longitude: 172.584966,
              latitudeDelta: 14,
              longitudeDelta: 14,
            }}
            showsUserLocation={true}>
            <Polygon
              fillColor={'#fff'}
              coordinates={northlandGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -35.585851, longitude: 173.869628}}>
              <Callout>
                {districtHealthBoardDataMap.get('Northland') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Northland</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Northland').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Northland').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Northland').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Northland').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Northland').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Northland').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={waitemataGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -36.544949, longitude: 174.572753}}>
              <Callout>
                {districtHealthBoardDataMap.get('Waitemata') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Waitemata</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Waitemata').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Waitemata').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Waitemata').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Waitemata').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Waitemata').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Waitemata').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#00f'}
              coordinates={aucklandPart1GeoCoordinates}
              tappable={true}
            />
            <Polygon
              fillColor={'#00f'}
              coordinates={aucklandPart2GeoCoordinates}
              tappable={true}
            />
            <Polygon
              fillColor={'#00f'}
              coordinates={aucklandPart3GeoCoordinates}
              tappable={true}
            />
            <Polygon
              fillColor={'#00f'}
              coordinates={aucklandPart4GeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -36.887309, longitude: 174.777374}}>
              <Callout>
                {districtHealthBoardDataMap.get('Auckland') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Auckland</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Auckland').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Auckland').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Auckland').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Auckland').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Auckland').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Auckland').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={countiesManukauGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -37.230328, longitude: 174.924316}}>
              <Callout>
                {districtHealthBoardDataMap.get('Counties Manukau') !==
                undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Counties Manukau</Text>
                    <Text>
                      Total Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Counties Manukau')
                          .totalCases
                      }
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Counties Manukau')
                          .newCases
                      }
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Counties Manukau')
                          .active
                      }
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Counties Manukau')
                          .recovered
                      }
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {
                        districtHealthBoardDataMap.get('Counties Manukau')
                          .deaths
                      }
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {
                        districtHealthBoardDataMap.get('Counties Manukau')
                          .inHospital
                      }
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={waikatoGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -38.186386, longitude: 175.275878}}>
              <Callout>
                {districtHealthBoardDataMap.get('Waikato') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Waikato</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Waikato').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Waikato').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Waikato').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Waikato').recovered}
                    </Text>
                    <Text>
                      Deaths: {districtHealthBoardDataMap.get('Waikato').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Waikato').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={lakesGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -38.685509, longitude: 176.154785}}>
              <Callout>
                {districtHealthBoardDataMap.get('Lakes') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Lakes</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Lakes').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Lakes').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Lakes').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Lakes').recovered}
                    </Text>
                    <Text>
                      Deaths: {districtHealthBoardDataMap.get('Lakes').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Lakes').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={bayOfPlentyGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -38.23818, longitude: 176.9458}}>
              <Callout>
                {districtHealthBoardDataMap.get('Bay of Plenty') !==
                undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Bay of Plenty</Text>
                    <Text>
                      Total Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Bay of Plenty')
                          .totalCases
                      }
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Bay of Plenty').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Bay of Plenty').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Bay of Plenty')
                          .recovered
                      }
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Bay of Plenty').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {
                        districtHealthBoardDataMap.get('Bay of Plenty')
                          .inHospital
                      }
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={tairawhitiGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -38.393338, longitude: 177.912597}}>
              <Callout>
                {districtHealthBoardDataMap.get('Tairāwhiti') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Tairāwhiti</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Tairāwhiti').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Tairāwhiti').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Tairāwhiti').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Tairāwhiti').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Tairāwhiti').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Tairāwhiti').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={taranakiGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -39.283293, longitude: 174.418945}}>
              <Callout>
                {districtHealthBoardDataMap.get('Taranaki') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Taranaki</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Taranaki').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Taranaki').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Taranaki').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Taranaki').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Taranaki').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Taranaki').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={hawkeBayGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -39.50404, longitude: 176.638183}}>
              <Callout>
                {districtHealthBoardDataMap.get("Hawke's Bay") !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Hawke's Bay</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get("Hawke's Bay").totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get("Hawke's Bay").newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get("Hawke's Bay").active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get("Hawke's Bay").recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get("Hawke's Bay").deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get("Hawke's Bay").inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={whanganuiGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -39.639537, longitude: 175.517578}}>
              <Callout>
                {districtHealthBoardDataMap.get('Whanganui') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Whanganui</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Whanganui').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Whanganui').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Whanganui').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Whanganui').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Whanganui').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Whanganui').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={midCentralGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -40.329795, longitude: 175.792236}}>
              <Callout>
                {districtHealthBoardDataMap.get('MidCentral') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>MidCentral</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('MidCentral').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('MidCentral').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('MidCentral').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('MidCentral').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('MidCentral').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('MidCentral').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={huttValleyGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -41.178653, longitude: 175.045166}}>
              <Callout>
                {districtHealthBoardDataMap.get('Hutt Valley') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Hutt Valley</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Hutt Valley').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Hutt Valley').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Hutt Valley').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Hutt Valley').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Hutt Valley').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Hutt Valley').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={capitalAndCoastGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -41.10419, longitude: 174.902343}}>
              <Callout>
                {districtHealthBoardDataMap.get('Capital and Coast') !==
                undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Capital and Coast</Text>
                    <Text>
                      Total Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Capital and Coast')
                          .totalCases
                      }
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Capital and Coast')
                          .newCases
                      }
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Capital and Coast')
                          .active
                      }
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Capital and Coast')
                          .recovered
                      }
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {
                        districtHealthBoardDataMap.get('Capital and Coast')
                          .deaths
                      }
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {
                        districtHealthBoardDataMap.get('Capital and Coast')
                          .inHospital
                      }
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={wairarapaGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -41.153842, longitude: 175.638427}}>
              <Callout>
                {districtHealthBoardDataMap.get('Wairarapa') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Wairarapa</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Wairarapa').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Wairarapa').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Wairarapa').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Wairarapa').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Wairarapa').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Wairarapa').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={nelsonMarlboroughGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -41.705728, longitude: 173.144531}}>
              <Callout>
                {districtHealthBoardDataMap.get('Nelson Marlborough') !==
                undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Nelson Marlborough</Text>
                    <Text>
                      Total Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Nelson Marlborough')
                          .totalCases
                      }
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Nelson Marlborough')
                          .newCases
                      }
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Nelson Marlborough')
                          .active
                      }
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('Nelson Marlborough')
                          .recovered
                      }
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {
                        districtHealthBoardDataMap.get('Nelson Marlborough')
                          .deaths
                      }
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {
                        districtHealthBoardDataMap.get('Nelson Marlborough')
                          .inHospital
                      }
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={westCoastGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -43.189157, longitude: 170.496826}}>
              <Callout>
                {districtHealthBoardDataMap.get('West Coast') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>West Coast</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('West Coast').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('West Coast').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('West Coast').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('West Coast').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('West Coast').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('West Coast').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={canterburyGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -43.317184, longitude: 172.045898}}>
              <Callout>
                {districtHealthBoardDataMap.get('Canterbury') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Canterbury</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Canterbury').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Canterbury').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Canterbury').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Canterbury').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Canterbury').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Canterbury').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={southCanterburyGeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -44.142797, longitude: 170.771484}}>
              <Callout>
                {districtHealthBoardDataMap.get('South Canterbury') !==
                undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>South Canterbury</Text>
                    <Text>
                      Total Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('South Canterbury')
                          .totalCases
                      }
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('South Canterbury')
                          .newCases
                      }
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('South Canterbury')
                          .active
                      }
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {
                        districtHealthBoardDataMap.get('South Canterbury')
                          .recovered
                      }
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {
                        districtHealthBoardDataMap.get('South Canterbury')
                          .deaths
                      }
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {
                        districtHealthBoardDataMap.get('South Canterbury')
                          .inHospital
                      }
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>

            <Polygon
              fillColor={'#fff'}
              coordinates={southernPart1GeoCoordinates}
              tappable={true}
            />
            <Polygon
              fillColor={'#fff'}
              coordinates={southernPart2GeoCoordinates}
              tappable={true}
            />
            <Marker
              opacity={0.0}
              calloutAnchor={{x: 0.5, y: 1}}
              coordinate={{latitude: -45.437008, longitude: 168.815917}}>
              <Callout>
                {districtHealthBoardDataMap.get('Southern') !== undefined ? (
                  <View>
                    <Text style={{fontWeight: 'bold'}}>Southern</Text>
                    <Text>
                      Total Cases:{' '}
                      {districtHealthBoardDataMap.get('Southern').totalCases}
                    </Text>
                    <Text>
                      New Cases:{' '}
                      {districtHealthBoardDataMap.get('Southern').newCases}
                    </Text>
                    <Text>
                      Active Cases:{' '}
                      {districtHealthBoardDataMap.get('Southern').active}
                    </Text>
                    <Text>
                      Recovered Cases:{' '}
                      {districtHealthBoardDataMap.get('Southern').recovered}
                    </Text>
                    <Text>
                      Deaths:{' '}
                      {districtHealthBoardDataMap.get('Southern').deaths}
                    </Text>
                    <Text>
                      In Hospital:{' '}
                      {districtHealthBoardDataMap.get('Southern').inHospital}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text>Loading</Text>
                  </View>
                )}
              </Callout>
            </Marker>
          </MapView>
        </View>
        <View>
          <WingBlank style={{marginBottom: 5, marginTop: 5}}>
            <Flex>
              <Flex.Item>
                <View style={dashboardStyles.firstItem}>
                  <WingBlank style={{marginBottom: 5}}>
                    <Flex direction="column">
                      <Flex.Item>
                        <Text style={dashboardStyles.firstLine} />
                      </Flex.Item>
                      <Flex.Item>
                        <Text style={dashboardStyles.secondLine}>
                          {dashboardData.activeCases}
                        </Text>
                      </Flex.Item>
                      <Flex.Item>
                        <Text style={dashboardStyles.thirdLine}>Active</Text>
                      </Flex.Item>
                    </Flex>
                  </WingBlank>
                </View>
              </Flex.Item>
              <Flex.Item>
                <View style={dashboardStyles.secondItem}>
                  <WingBlank style={{marginBottom: 5}}>
                    <Flex direction="column">
                      <Flex.Item>
                        <Text style={dashboardStyles.firstLine}>
                          New{' '}
                          {dashboardData.combinedCasesNew >= 0
                            ? '+' + dashboardData.combinedCasesNew
                            : dashboardData.combinedCasesNew}
                        </Text>
                      </Flex.Item>
                      <Flex.Item>
                        <Text style={dashboardStyles.secondLine}>
                          {dashboardData.combinedCases}
                        </Text>
                      </Flex.Item>
                      <Flex.Item>
                        <Text style={dashboardStyles.thirdLine}>Total</Text>
                      </Flex.Item>
                    </Flex>
                  </WingBlank>
                </View>
              </Flex.Item>
              <Flex.Item>
                <View style={dashboardStyles.thirdItem}>
                  <WingBlank style={{marginBottom: 5}}>
                    <Flex direction="column">
                      <Flex.Item>
                        <Text style={dashboardStyles.firstLine}>
                          New{' '}
                          {dashboardData.deathsNew >= 0
                            ? '+' + dashboardData.deathsNew
                            : dashboardData.deathsNew}
                        </Text>
                      </Flex.Item>
                      <Flex.Item>
                        <Text style={dashboardStyles.secondLine}>
                          {dashboardData.deaths}
                        </Text>
                      </Flex.Item>
                      <Flex.Item>
                        <Text style={dashboardStyles.thirdLine}>Deaths</Text>
                      </Flex.Item>
                    </Flex>
                  </WingBlank>
                </View>
              </Flex.Item>
              <Flex.Item>
                <View style={dashboardStyles.forthItem}>
                  <WingBlank style={{marginBottom: 5}}>
                    <Flex direction="column">
                      <Flex.Item>
                        <Text style={dashboardStyles.firstLine}>
                          New{' '}
                          {dashboardData.recoveredCasesNew >= 0
                            ? '+' + dashboardData.recoveredCasesNew
                            : dashboardData.recoveredCasesNew}
                        </Text>
                      </Flex.Item>
                      <Flex.Item>
                        <Text style={dashboardStyles.secondLine}>
                          {dashboardData.recoveredCases}
                        </Text>
                      </Flex.Item>
                      <Flex.Item>
                        <Text style={dashboardStyles.thirdLine}>Recovered</Text>
                      </Flex.Item>
                    </Flex>
                  </WingBlank>
                </View>
              </Flex.Item>
            </Flex>
          </WingBlank>
        </View>
        <View style={summaryStyles.container}>
          <Text style={{fontWeight: 'bold', fontSize: 16, textAlign: 'center'}}>
            Daily Cases
          </Text>
          <LineChart
            style={{flex: 1}}
            data={[
              {
                data: summaryData.combinedTotal,
                svg: {stroke: 'orange'},
              },
              {
                data: summaryData.recoveredTotal,
                svg: {stroke: 'green'},
              },
              {
                data: summaryData.deathsTotal,
                svg: {stroke: 'black'},
              },
            ]}
            contentInset={{top: 10, bottom: 10}}>
            <Grid />
          </LineChart>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              marginTop: 10,
              textAlign: 'center',
            }}>
            Total Cases
          </Text>
          <LineChart
            style={{flex: 1}}
            data={[
              {
                data: summaryData.combined,
                svg: {stroke: 'orange'},
              },
              {
                data: summaryData.recovered,
                svg: {stroke: 'green'},
              },
              {
                data: summaryData.deaths,
                svg: {stroke: 'black'},
              },
            ]}
            contentInset={{top: 10, bottom: 10}}>
            <Grid />
          </LineChart>
          <Text style={{fontSize: 10, textAlign: 'center'}}>
            <Icon name="minus-square" size="xs" color="orange" />
            Confirmed&nbsp;&nbsp;
            <Icon name="minus-square" size="xs" color="green" />
            Recovered&nbsp;&nbsp;
            <Icon name="minus-square" size="xs" color="black" />
            Deaths
          </Text>
        </View>
        <View>
          {districtHealthBoardData.map((item, index) => {
            return (
              <View key={index}>
                <WingBlank size="lg" style={{marginBottom: 5}}>
                  <Card>
                    <Card.Header
                      title={item.name}
                      extra={
                        <Text
                          style={{marginLeft: 150}}
                          onPress={() => {
                            this.setState({
                              isShowModal: true,
                              modalDetail: item,
                            });
                          }}>
                          <Icon name="bars" size="md" color="blue" />
                        </Text>
                      }
                    />
                    <Card.Body>
                      <View style={{height: 50}}>
                        <Flex direction={'row'}>
                          <Flex.Item>
                            <Flex
                              direction={'column'}
                              justify={'start'}
                              style={{marginTop: 5}}>
                              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                                <Icon name="fire" size="md" color="orange" />
                                {item.active}
                                <Icon name="bug" size="md" color="orange" />
                                {item.totalCases}
                                <Icon
                                  name="plus-circle"
                                  size="md"
                                  color="blue"
                                />
                                {item.newCases}
                              </Text>
                              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                                <Icon name="smile" size="md" color="green" />
                                {item.recovered}
                                <Icon name="meh" size="md" color="red" />
                                {item.inHospital}
                                <Icon name="frown" size="md" color="black" />
                                {item.deaths}
                              </Text>
                            </Flex>
                          </Flex.Item>
                          <Flex.Item>
                            <LineChart
                              style={{flex: 1}}
                              data={item.activeTrend}
                              contentInset={{top: 10, bottom: 10}}
                              svg={{stroke: 'orange'}}
                            />
                          </Flex.Item>
                        </Flex>
                      </View>
                    </Card.Body>
                  </Card>
                </WingBlank>
              </View>
            );
          })}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Modal
              isVisible={this.state.isShowModal}
              style={{
                justifyContent: 'flex-end',
                margin: 0,
              }}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              onBackdropPress={() => this.onModalClose()}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  borderColor: 'rgba(0, 0, 0, 0.1)',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {this.state.modalDetail.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 15,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <View style={{flexDirection: 'column'}}>
                    <WingBlank>
                      <Text style={dashboardStyles.firstLine} />
                      <Text style={dashboardStyles.secondLine}>
                        {this.state.modalDetail.active}
                      </Text>
                      <Text style={dashboardStyles.thirdLine}>Active</Text>
                    </WingBlank>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <WingBlank>
                      <Text style={dashboardStyles.firstLine}>
                        New{' '}
                        {this.state.modalDetail.newCases >= 0
                          ? '+' + this.state.modalDetail.newCases
                          : this.state.modalDetail.newCases}
                      </Text>
                      <Text style={dashboardStyles.secondLine}>
                        {this.state.modalDetail.totalCases}
                      </Text>
                      <Text style={dashboardStyles.thirdLine}>Total</Text>
                    </WingBlank>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <WingBlank>
                      <Text style={dashboardStyles.firstLine} />
                      <Text style={dashboardStyles.secondLine}>
                        {this.state.modalDetail.recovered}
                      </Text>
                      <Text style={dashboardStyles.thirdLine}>Recovered</Text>
                    </WingBlank>
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    <WingBlank>
                      <Text style={dashboardStyles.firstLine} />
                      <Text style={dashboardStyles.secondLine}>
                        {this.state.modalDetail.deaths}
                      </Text>
                      <Text style={dashboardStyles.thirdLine}>Deaths</Text>
                    </WingBlank>
                  </View>
                </View>
                <View
                  style={{
                    margin: 15,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      textAlign: 'center',
                    }}>
                    Daily Cases
                  </Text>
                  <LineChart
                    style={{
                      height: 150,
                      width: Dimensions.get('window').width / 1.5,
                    }}
                    data={[
                      {
                        data: this.state.modalDetail.totalTrend,
                        svg: {stroke: 'orange'},
                      },
                      {
                        data: this.state.modalDetail.recoveredTrend,
                        svg: {stroke: 'green'},
                      },
                      {
                        data: this.state.modalDetail.deathsTrend,
                        svg: {stroke: 'black'},
                      },
                    ]}
                    contentInset={{top: 10, bottom: 10}}
                  />
                  <Text style={{fontSize: 10, textAlign: 'center'}}>
                    <Icon name="minus-square" size="xs" color="orange" />
                    Confirmed&nbsp;&nbsp;
                    <Icon name="minus-square" size="xs" color="green" />
                    Recovered&nbsp;&nbsp;
                    <Icon name="minus-square" size="xs" color="black" />
                    Deaths
                  </Text>
                  {this.state.modalDetail.agesGenders !== undefined ? (
                    <StackedBarChart
                      style={{height: 250}}
                      colors={['#00b6ae', '#aacd6e']}
                      contentInset={{top: 30, bottom: 30}}
                      horizontal={true}
                      data={this.state.modalDetail.agesGenders.map(function(
                        item,
                      ) {
                        return {
                          age: item.age,
                          female: item.female,
                          male: item.male,
                        };
                      })}
                      keys={['female', 'male']}
                      showGrid={false}
                    />
                  ) : (
                    <Text>Loading</Text>
                  )}
                  <Text
                    style={{fontSize: 10, textAlign: 'center', marginTop: -20}}>
                    <Icon name="minus-square" size="xs" color="#00b6ae" />
                    Female&nbsp;&nbsp;
                    <Icon name="minus-square" size="xs" color="#aacd6e" />
                    Male
                  </Text>
                </View>
                <Button
                  type="primary"
                  size="large"
                  onPress={this.onModalClose}
                  styles={{margin: 20}}>
                  Back to the Whole Country
                </Button>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const serverIp = 'http://172.22.64.1:8080';

const mapStyles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const dashboardStyles = StyleSheet.create({
  firstItem: {
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  secondItem: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0.5,
  },
  thirdItem: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
  },
  forthItem: {
    borderWidth: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  firstLine: {
    fontSize: 12,
    textAlign: 'center',
  },
  secondLine: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thirdLine: {
    fontSize: 10,
    textAlign: 'center',
  },
});

const summaryStyles = StyleSheet.create({
  container: {
    height: 360,
    padding: 10,
    flexDirection: 'column',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    marginBottom: 10,
  },
});

const northlandGeoCoordinates = [
  {longitude: 174.616639, latitude: -36.11756},
  {longitude: 174.562809, latitude: -36.179},
  {longitude: 174.481748, latitude: -36.228277},
  {longitude: 174.397699, latitude: -36.28808},
  {longitude: 174.338966, latitude: -36.31683},
  {longitude: 174.278493, latitude: -36.28574},
  {longitude: 174.289544, latitude: -36.223938},
  {longitude: 174.214573, latitude: -36.258712},
  {longitude: 174.15417, latitude: -36.214355},
  {longitude: 174.128773, latitude: -36.173612},
  {longitude: 174.045998, latitude: -36.17017},
  {longitude: 174.095972, latitude: -36.244888},
  {longitude: 174.155296, latitude: -36.276013},
  {longitude: 174.181867, latitude: -36.363036},
  {longitude: 174.135351, latitude: -36.39205},
  {longitude: 174.040528, latitude: -36.392883},
  {longitude: 174.007201, latitude: -36.279409},
  {longitude: 173.983676, latitude: -36.233705},
  {longitude: 173.866047, latitude: -36.0912},
  {longitude: 173.688098, latitude: -35.892417},
  {longitude: 173.455246, latitude: -35.647954},
  {longitude: 173.365181, latitude: -35.547402},
  {longitude: 173.367159, latitude: -35.533587},
  {longitude: 173.241064, latitude: -35.395664},
  {longitude: 173.212719, latitude: -35.376707},
  {longitude: 173.163085, latitude: -35.292562},
  {longitude: 173.054268, latitude: -35.191355},
  {longitude: 173.120699, latitude: -35.179112},
  {longitude: 173.169124, latitude: -35.135826},
  {longitude: 173.174353, latitude: -35.064922},
  {longitude: 173.135985, latitude: -34.969079},
  {longitude: 173.081006, latitude: -34.892392},
  {longitude: 172.854006, latitude: -34.632566},
  {longitude: 172.693459, latitude: -34.493001},
  {longitude: 172.65402, latitude: -34.477719},
  {longitude: 172.680094, latitude: -34.421443},
  {longitude: 172.796861, latitude: -34.45467},
  {longitude: 172.869035, latitude: -34.414519},
  {longitude: 172.936537, latitude: -34.427085},
  {longitude: 173.012164, latitude: -34.422083},
  {longitude: 172.989042, latitude: -34.517707},
  {longitude: 173.004423, latitude: -34.599808},
  {longitude: 173.058566, latitude: -34.702456},
  {longitude: 173.116356, latitude: -34.736981},
  {longitude: 173.171799, latitude: -34.800412},
  {longitude: 173.157998, latitude: -34.841932},
  {longitude: 173.199325, latitude: -34.870969},
  {longitude: 173.275483, latitude: -34.888498},
  {longitude: 173.286915, latitude: -34.863499},
  {longitude: 173.367717, latitude: -34.848489},
  {longitude: 173.405013, latitude: -34.804522},
  {longitude: 173.459957, latitude: -34.848038},
  {longitude: 173.413637, latitude: -34.880784},
  {longitude: 173.373021, latitude: -34.881561},
  {longitude: 173.38971, latitude: -34.953496},
  {longitude: 173.465407, latitude: -34.993442},
  {longitude: 173.532129, latitude: -34.979979},
  {longitude: 173.526686, latitude: -34.946207},
  {longitude: 173.562635, latitude: -34.921568},
  {longitude: 173.644032, latitude: -34.966194},
  {longitude: 173.701142, latitude: -34.952477},
  {longitude: 173.716577, latitude: -34.997537},
  {longitude: 173.777445, latitude: -35.008217},
  {longitude: 173.841273, latitude: -34.994309},
  {longitude: 173.931278, latitude: -35.047299},
  {longitude: 173.963285, latitude: -35.118863},
  {longitude: 174.07854, latitude: -35.116132},
  {longitude: 174.09756, latitude: -35.150929},
  {longitude: 174.341168, latitude: -35.163333},
  {longitude: 174.292269, latitude: -35.234379},
  {longitude: 174.289785, latitude: -35.275148},
  {longitude: 174.336897, latitude: -35.325396},
  {longitude: 174.372045, latitude: -35.32611},
  {longitude: 174.389873, latitude: -35.433206},
  {longitude: 174.469541, latitude: -35.49102},
  {longitude: 174.474719, latitude: -35.556346},
  {longitude: 174.536926, latitude: -35.584758},
  {longitude: 174.508531, latitude: -35.677559},
  {longitude: 174.560765, latitude: -35.714699},
  {longitude: 174.549381, latitude: -35.786518},
  {longitude: 174.583913, latitude: -35.856848},
  {longitude: 174.530641, latitude: -35.862013},
  {longitude: 174.500918, latitude: -35.838637},
  {longitude: 174.460145, latitude: -35.914535},
  {longitude: 174.471703, latitude: -35.971239},
  {longitude: 174.510001, latitude: -36.030465},
  {longitude: 174.589781, latitude: -36.04819},
  {longitude: 174.616639, latitude: -36.11756},
];
const waitemataGeoCoordinates = [
  {longitude: 174.690752, latitude: -36.911708},
  {longitude: 174.692609, latitude: -36.932126},
  {longitude: 174.583828, latitude: -37.007311},
  {longitude: 174.497585, latitude: -37.052115},
  {longitude: 174.48182, latitude: -37.041096},
  {longitude: 174.468611, latitude: -36.954076},
  {longitude: 174.424402, latitude: -36.82422},
  {longitude: 174.273615, latitude: -36.611344},
  {longitude: 174.168704, latitude: -36.494431},
  {longitude: 174.187919, latitude: -36.434494},
  {longitude: 174.235835, latitude: -36.428091},
  {longitude: 174.299569, latitude: -36.526135},
  {longitude: 174.376229, latitude: -36.563281},
  {longitude: 174.37538, latitude: -36.604635},
  {longitude: 174.410708, latitude: -36.623021},
  {longitude: 174.431322, latitude: -36.511005},
  {longitude: 174.409581, latitude: -36.485995},
  {longitude: 174.430624, latitude: -36.430897},
  {longitude: 174.394183, latitude: -36.389038},
  {longitude: 174.350668, latitude: -36.403174},
  {longitude: 174.311472, latitude: -36.373417},
  {longitude: 174.25746, latitude: -36.380903},
  {longitude: 174.25757, latitude: -36.325956},
  {longitude: 174.391288, latitude: -36.312474},
  {longitude: 174.481748, latitude: -36.228277},
  {longitude: 174.562809, latitude: -36.179},
  {longitude: 174.616639, latitude: -36.11756},
  {longitude: 174.657346, latitude: -36.177532},
  {longitude: 174.745751, latitude: -36.256922},
  {longitude: 174.818184, latitude: -36.285268},
  {longitude: 174.779851, latitude: -36.319133},
  {longitude: 174.785544, latitude: -36.347195},
  {longitude: 174.840345, latitude: -36.369668},
  {longitude: 174.737602, latitude: -36.398923},
  {longitude: 174.766699, latitude: -36.445542},
  {longitude: 174.749591, latitude: -36.494078},
  {longitude: 174.692815, latitude: -36.575735},
  {longitude: 174.734992, latitude: -36.623035},
  {longitude: 174.775982, latitude: -36.773506},
  {longitude: 174.74685, latitude: -36.820639},
  {longitude: 174.643161, latitude: -36.826569},
  {longitude: 174.654362, latitude: -36.868257},
  {longitude: 174.690752, latitude: -36.911708},
];
const aucklandPart1GeoCoordinates = [
  {longitude: 174.84275, latitude: -36.95527},
  {longitude: 174.829861, latitude: -36.938372},
  {longitude: 174.77259, latitude: -36.92439},
  {longitude: 174.692609, latitude: -36.932126},
  {longitude: 174.690752, latitude: -36.911708},
  {longitude: 174.663986, latitude: -36.870764},
  {longitude: 174.739987, latitude: -36.83639},
  {longitude: 174.875511, latitude: -36.846802},
  {longitude: 174.884673, latitude: -36.869124},
  {longitude: 174.852594, latitude: -36.914374},
  {longitude: 174.84275, latitude: -36.95527},
];
const aucklandPart2GeoCoordinates = [
  {longitude: 175.172595, latitude: -36.738659},
  {longitude: 175.13813, latitude: -36.846471},
  {longitude: 175.037344, latitude: -36.811853},
  {longitude: 175.172595, latitude: -36.738659},
];
const aucklandPart3GeoCoordinates = [
  {longitude: 175.090898, latitude: -36.165619},
  {longitude: 175.107952, latitude: -36.224713},
  {longitude: 175.052507, latitude: -36.215066},
  {longitude: 175.090898, latitude: -36.165619},
];
const aucklandPart4GeoCoordinates = [
  {longitude: 175.397381, latitude: -36.049713},
  {longitude: 175.426355, latitude: -36.09182},
  {longitude: 175.422708, latitude: -36.129189},
  {longitude: 175.4837, latitude: -36.192152},
  {longitude: 175.479486, latitude: -36.244404},
  {longitude: 175.550653, latitude: -36.313934},
  {longitude: 175.52698, latitude: -36.346552},
  {longitude: 175.437766, latitude: -36.307523},
  {longitude: 175.433507, latitude: -36.272344},
  {longitude: 175.350243, latitude: -36.228536},
  {longitude: 175.365826, latitude: -36.185315},
  {longitude: 175.347691, latitude: -36.152231},
  {longitude: 175.36712, latitude: -36.115678},
  {longitude: 175.341795, latitude: -36.068592},
  {longitude: 175.397381, latitude: -36.049713},
];
const countiesManukauGeoCoordinates = [
  {longitude: 175.320192, latitude: -37.183929},
  {longitude: 175.196522, latitude: -37.202057},
  {longitude: 175.154469, latitude: -37.277379},
  {longitude: 175.084725, latitude: -37.305559},
  {longitude: 175.032614, latitude: -37.345932},
  {longitude: 175.061976, latitude: -37.398234},
  {longitude: 174.998806, latitude: -37.454417},
  {longitude: 174.995423, latitude: -37.493315},
  {longitude: 174.908341, latitude: -37.569258},
  {longitude: 174.825407, latitude: -37.563285},
  {longitude: 174.770252, latitude: -37.586298},
  {longitude: 174.768715, latitude: -37.56085},
  {longitude: 174.705013, latitude: -37.43775},
  {longitude: 174.706142, latitude: -37.381685},
  {longitude: 174.538638, latitude: -37.076632},
  {longitude: 174.563647, latitude: -37.042742},
  {longitude: 174.627048, latitude: -37.036734},
  {longitude: 174.703279, latitude: -37.207557},
  {longitude: 174.739502, latitude: -37.126225},
  {longitude: 174.774187, latitude: -37.089452},
  {longitude: 174.822438, latitude: -37.083052},
  {longitude: 174.826172, latitude: -37.039519},
  {longitude: 174.69946, latitude: -37.036856},
  {longitude: 174.639837, latitude: -37.0068},
  {longitude: 174.717774, latitude: -36.969186},
  {longitude: 174.754837, latitude: -36.93251},
  {longitude: 174.829861, latitude: -36.938372},
  {longitude: 174.84275, latitude: -36.95527},
  {longitude: 174.877159, latitude: -36.883665},
  {longitude: 174.913746, latitude: -36.870434},
  {longitude: 174.947705, latitude: -36.891316},
  {longitude: 175.03754, latitude: -36.873363},
  {longitude: 175.101539, latitude: -36.932728},
  {longitude: 175.194032, latitude: -36.934309},
  {longitude: 175.283329, latitude: -36.988506},
  {longitude: 175.303332, latitude: -37.055332},
  {longitude: 175.294961, latitude: -37.121103},
  {longitude: 175.320192, latitude: -37.183929},
];
const waikatoGeoCoordinates = [
  {longitude: 175.940104, latitude: -37.373242},
  {longitude: 175.913492, latitude: -37.425587},
  {longitude: 175.832776, latitude: -37.471602},
  {longitude: 175.810099, latitude: -37.513868},
  {longitude: 175.833587, latitude: -37.627487},
  {longitude: 175.927716, latitude: -37.776005},
  {longitude: 175.905874, latitude: -37.828552},
  {longitude: 175.977188, latitude: -37.913673},
  {longitude: 175.940946, latitude: -37.929422},
  {longitude: 175.97148, latitude: -37.986408},
  {longitude: 176.062252, latitude: -38.026823},
  {longitude: 175.999088, latitude: -38.131476},
  {longitude: 176.030713, latitude: -38.166581},
  {longitude: 176.110109, latitude: -38.166863},
  {longitude: 176.150335, latitude: -38.218186},
  {longitude: 176.120517, latitude: -38.267914},
  {longitude: 176.1265, latitude: -38.30879},
  {longitude: 176.073546, latitude: -38.326912},
  {longitude: 176.031253, latitude: -38.379755},
  {longitude: 175.958193, latitude: -38.421338},
  {longitude: 175.862067, latitude: -38.425937},
  {longitude: 175.832238, latitude: -38.439818},
  {longitude: 175.769491, latitude: -38.392811},
  {longitude: 175.739568, latitude: -38.34957},
  {longitude: 175.605864, latitude: -38.461576},
  {longitude: 175.632459, latitude: -38.591775},
  {longitude: 175.575929, latitude: -38.649852},
  {longitude: 175.580739, latitude: -38.677579},
  {longitude: 175.523387, latitude: -38.750092},
  {longitude: 175.57462, latitude: -38.8163},
  {longitude: 175.546438, latitude: -38.859873},
  {longitude: 175.57997, latitude: -38.910684},
  {longitude: 175.553884, latitude: -38.955716},
  {longitude: 175.562634, latitude: -38.98683},
  {longitude: 175.682012, latitude: -38.97971},
  {longitude: 175.648052, latitude: -39.014413},
  {longitude: 175.617972, latitude: -39.081249},
  {longitude: 175.642791, latitude: -39.104306},
  {longitude: 175.634656, latitude: -39.158363},
  {longitude: 175.557854, latitude: -39.275998},
  {longitude: 175.489522, latitude: -39.258044},
  {longitude: 175.379851, latitude: -39.277052},
  {longitude: 175.265096, latitude: -39.275236},
  {longitude: 175.194729, latitude: -39.166361},
  {longitude: 175.158361, latitude: -39.190419},
  {longitude: 175.070139, latitude: -39.172383},
  {longitude: 174.940771, latitude: -39.179219},
  {longitude: 175.047306, latitude: -39.070358},
  {longitude: 174.976095, latitude: -39.062822},
  {longitude: 174.959376, latitude: -39.001466},
  {longitude: 174.88264, latitude: -38.970397},
  {longitude: 174.87116, latitude: -38.890445},
  {longitude: 174.831943, latitude: -38.904388},
  {longitude: 174.798771, latitude: -38.865267},
  {longitude: 174.81987, latitude: -38.787517},
  {longitude: 174.79196, latitude: -38.731777},
  {longitude: 174.756114, latitude: -38.744958},
  {longitude: 174.655191, latitude: -38.733283},
  {longitude: 174.615147, latitude: -38.706648},
  {longitude: 174.645575, latitude: -38.456367},
  {longitude: 174.634642, latitude: -38.387196},
  {longitude: 174.715705, latitude: -38.306504},
  {longitude: 174.712538, latitude: -38.200598},
  {longitude: 174.690775, latitude: -38.117624},
  {longitude: 174.734717, latitude: -38.123926},
  {longitude: 174.777802, latitude: -38.081532},
  {longitude: 174.795237, latitude: -38.01958},
  {longitude: 174.783674, latitude: -37.941338},
  {longitude: 174.756809, latitude: -37.863863},
  {longitude: 174.77425, latitude: -37.833325},
  {longitude: 174.838042, latitude: -37.803949},
  {longitude: 174.812708, latitude: -37.687045},
  {longitude: 174.770252, latitude: -37.586298},
  {longitude: 174.825407, latitude: -37.563285},
  {longitude: 174.908341, latitude: -37.569258},
  {longitude: 174.995423, latitude: -37.493315},
  {longitude: 174.998806, latitude: -37.454417},
  {longitude: 175.061976, latitude: -37.398234},
  {longitude: 175.032614, latitude: -37.345932},
  {longitude: 175.084725, latitude: -37.305559},
  {longitude: 175.154469, latitude: -37.277379},
  {longitude: 175.196522, latitude: -37.202057},
  {longitude: 175.320192, latitude: -37.183929},
  {longitude: 175.399204, latitude: -37.227041},
  {longitude: 175.509682, latitude: -37.187334},
  {longitude: 175.544917, latitude: -37.1574},
  {longitude: 175.504793, latitude: -37.102447},
  {longitude: 175.524434, latitude: -37.061478},
  {longitude: 175.490963, latitude: -36.962206},
  {longitude: 175.427296, latitude: -36.896665},
  {longitude: 175.431815, latitude: -36.789149},
  {longitude: 175.479728, latitude: -36.734315},
  {longitude: 175.429445, latitude: -36.700141},
  {longitude: 175.447084, latitude: -36.660092},
  {longitude: 175.43891, latitude: -36.610846},
  {longitude: 175.344545, latitude: -36.553023},
  {longitude: 175.328268, latitude: -36.480801},
  {longitude: 175.368191, latitude: -36.468598},
  {longitude: 175.458402, latitude: -36.523575},
  {longitude: 175.520192, latitude: -36.540797},
  {longitude: 175.522613, latitude: -36.591864},
  {longitude: 175.583391, latitude: -36.627217},
  {longitude: 175.572617, latitude: -36.655006},
  {longitude: 175.627136, latitude: -36.722622},
  {longitude: 175.709009, latitude: -36.727081},
  {longitude: 175.788851, latitude: -36.704119},
  {longitude: 175.791351, latitude: -36.741164},
  {longitude: 175.750102, latitude: -36.76381},
  {longitude: 175.768196, latitude: -36.820158},
  {longitude: 175.814838, latitude: -36.842941},
  {longitude: 175.856005, latitude: -36.922809},
  {longitude: 175.843165, latitude: -36.964495},
  {longitude: 175.888322, latitude: -37.039187},
  {longitude: 175.889468, latitude: -37.117596},
  {longitude: 175.876605, latitude: -37.206635},
  {longitude: 175.89816, latitude: -37.27111},
  {longitude: 175.941955, latitude: -37.345232},
  {longitude: 175.940104, latitude: -37.373242},
];
const lakesGeoCoordinates = [
  {longitude: 176.697713, latitude: -38.855956},
  {longitude: 176.598465, latitude: -38.933293},
  {longitude: 176.610356, latitude: -38.998264},
  {longitude: 176.449226, latitude: -39.001619},
  {longitude: 176.420177, latitude: -39.061939},
  {longitude: 176.443493, latitude: -39.120805},
  {longitude: 176.386854, latitude: -39.13658},
  {longitude: 176.340355, latitude: -39.173115},
  {longitude: 176.233225, latitude: -39.097875},
  {longitude: 176.176124, latitude: -39.143901},
  {longitude: 176.044065, latitude: -39.156917},
  {longitude: 175.975963, latitude: -39.150023},
  {longitude: 175.955889, latitude: -39.186422},
  {longitude: 175.885971, latitude: -39.205895},
  {longitude: 175.812569, latitude: -39.300326},
  {longitude: 175.751846, latitude: -39.287877},
  {longitude: 175.669212, latitude: -39.296934},
  {longitude: 175.557854, latitude: -39.275998},
  {longitude: 175.634656, latitude: -39.158363},
  {longitude: 175.642791, latitude: -39.104306},
  {longitude: 175.617972, latitude: -39.081249},
  {longitude: 175.648052, latitude: -39.014413},
  {longitude: 175.682012, latitude: -38.97971},
  {longitude: 175.562634, latitude: -38.98683},
  {longitude: 175.553884, latitude: -38.955716},
  {longitude: 175.57997, latitude: -38.910684},
  {longitude: 175.546438, latitude: -38.859873},
  {longitude: 175.57462, latitude: -38.8163},
  {longitude: 175.523387, latitude: -38.750092},
  {longitude: 175.580739, latitude: -38.677579},
  {longitude: 175.575929, latitude: -38.649852},
  {longitude: 175.632459, latitude: -38.591775},
  {longitude: 175.605864, latitude: -38.461576},
  {longitude: 175.739568, latitude: -38.34957},
  {longitude: 175.769491, latitude: -38.392811},
  {longitude: 175.832238, latitude: -38.439818},
  {longitude: 175.862067, latitude: -38.425937},
  {longitude: 175.958193, latitude: -38.421338},
  {longitude: 176.031253, latitude: -38.379755},
  {longitude: 176.073546, latitude: -38.326912},
  {longitude: 176.1265, latitude: -38.30879},
  {longitude: 176.120517, latitude: -38.267914},
  {longitude: 176.150335, latitude: -38.218186},
  {longitude: 176.110109, latitude: -38.166863},
  {longitude: 176.030713, latitude: -38.166581},
  {longitude: 175.999088, latitude: -38.131476},
  {longitude: 176.062252, latitude: -38.026823},
  {longitude: 176.09831, latitude: -37.96187},
  {longitude: 176.253705, latitude: -37.955492},
  {longitude: 176.286302, latitude: -37.937047},
  {longitude: 176.351032, latitude: -37.937173},
  {longitude: 176.384075, latitude: -37.954939},
  {longitude: 176.498061, latitude: -37.96252},
  {longitude: 176.51063, latitude: -37.995052},
  {longitude: 176.602945, latitude: -38.011347},
  {longitude: 176.603599, latitude: -38.120561},
  {longitude: 176.584022, latitude: -38.124658},
  {longitude: 176.578106, latitude: -38.426963},
  {longitude: 176.499938, latitude: -38.432474},
  {longitude: 176.476279, latitude: -38.510085},
  {longitude: 176.533366, latitude: -38.53515},
  {longitude: 176.552052, latitude: -38.580813},
  {longitude: 176.605624, latitude: -38.608689},
  {longitude: 176.645947, latitude: -38.605927},
  {longitude: 176.617456, latitude: -38.701346},
  {longitude: 176.624184, latitude: -38.754294},
  {longitude: 176.697713, latitude: -38.855956},
];
const bayOfPlentyGeoCoordinates = [
  {longitude: 178.085284, latitude: -37.542391},
  {longitude: 178.107555, latitude: -37.598716},
  {longitude: 177.986683, latitude: -37.608757},
  {longitude: 177.996622, latitude: -37.760276},
  {longitude: 178.038707, latitude: -37.733116},
  {longitude: 178.073007, latitude: -37.76359},
  {longitude: 177.972292, latitude: -37.845005},
  {longitude: 177.860967, latitude: -38.111656},
  {longitude: 177.739984, latitude: -38.042047},
  {longitude: 177.694136, latitude: -38.053444},
  {longitude: 177.692068, latitude: -38.108278},
  {longitude: 177.653591, latitude: -38.158585},
  {longitude: 177.604789, latitude: -38.186621},
  {longitude: 177.495597, latitude: -38.222694},
  {longitude: 177.486299, latitude: -38.296268},
  {longitude: 177.463688, latitude: -38.333536},
  {longitude: 177.236922, latitude: -38.426342},
  {longitude: 177.257394, latitude: -38.508277},
  {longitude: 177.204179, latitude: -38.524282},
  {longitude: 177.152469, latitude: -38.583781},
  {longitude: 177.122171, latitude: -38.583921},
  {longitude: 177.094735, latitude: -38.618336},
  {longitude: 177.04598, latitude: -38.620802},
  {longitude: 176.991448, latitude: -38.693695},
  {longitude: 176.928205, latitude: -38.697575},
  {longitude: 176.878668, latitude: -38.667135},
  {longitude: 176.766747, latitude: -38.68931},
  {longitude: 176.717283, latitude: -38.724524},
  {longitude: 176.697713, latitude: -38.855956},
  {longitude: 176.624184, latitude: -38.754294},
  {longitude: 176.617456, latitude: -38.701346},
  {longitude: 176.645947, latitude: -38.605927},
  {longitude: 176.605624, latitude: -38.608689},
  {longitude: 176.552052, latitude: -38.580813},
  {longitude: 176.533366, latitude: -38.53515},
  {longitude: 176.476279, latitude: -38.510085},
  {longitude: 176.499938, latitude: -38.432474},
  {longitude: 176.578106, latitude: -38.426963},
  {longitude: 176.584022, latitude: -38.124658},
  {longitude: 176.603599, latitude: -38.120561},
  {longitude: 176.602945, latitude: -38.011347},
  {longitude: 176.51063, latitude: -37.995052},
  {longitude: 176.498061, latitude: -37.96252},
  {longitude: 176.384075, latitude: -37.954939},
  {longitude: 176.351032, latitude: -37.937173},
  {longitude: 176.286302, latitude: -37.937047},
  {longitude: 176.253705, latitude: -37.955492},
  {longitude: 176.09831, latitude: -37.96187},
  {longitude: 176.062252, latitude: -38.026823},
  {longitude: 175.97148, latitude: -37.986408},
  {longitude: 175.940946, latitude: -37.929422},
  {longitude: 175.977188, latitude: -37.913673},
  {longitude: 175.905874, latitude: -37.828552},
  {longitude: 175.927716, latitude: -37.776005},
  {longitude: 175.833587, latitude: -37.627487},
  {longitude: 175.810099, latitude: -37.513868},
  {longitude: 175.832776, latitude: -37.471602},
  {longitude: 175.913492, latitude: -37.425587},
  {longitude: 175.940104, latitude: -37.373242},
  {longitude: 175.963444, latitude: -37.433381},
  {longitude: 176.096449, latitude: -37.581953},
  {longitude: 176.250032, latitude: -37.68004},
  {longitude: 176.41432, latitude: -37.747511},
  {longitude: 176.496143, latitude: -37.76913},
  {longitude: 176.601951, latitude: -37.829514},
  {longitude: 176.736144, latitude: -37.879596},
  {longitude: 176.931669, latitude: -37.916897},
  {longitude: 177.059549, latitude: -37.970685},
  {longitude: 177.181966, latitude: -37.989488},
  {longitude: 177.383686, latitude: -37.983696},
  {longitude: 177.487534, latitude: -37.94956},
  {longitude: 177.54679, latitude: -37.90758},
  {longitude: 177.619619, latitude: -37.810728},
  {longitude: 177.683952, latitude: -37.760154},
  {longitude: 177.727636, latitude: -37.680188},
  {longitude: 177.868536, latitude: -37.653383},
  {longitude: 177.902977, latitude: -37.60763},
  {longitude: 177.94492, latitude: -37.618857},
  {longitude: 178.006622, latitude: -37.553128},
  {longitude: 178.085284, latitude: -37.542391},
];
const tairawhitiGeoCoordinates = [
  {longitude: 177.898993, latitude: -38.971833},
  {longitude: 177.834797, latitude: -38.952779},
  {longitude: 177.844528, latitude: -38.921503},
  {longitude: 177.749235, latitude: -38.896674},
  {longitude: 177.660164, latitude: -38.904701},
  {longitude: 177.66049, latitude: -38.848942},
  {longitude: 177.599781, latitude: -38.851898},
  {longitude: 177.597523, latitude: -38.807041},
  {longitude: 177.494212, latitude: -38.777974},
  {longitude: 177.462253, latitude: -38.704805},
  {longitude: 177.434478, latitude: -38.69381},
  {longitude: 177.447818, latitude: -38.635892},
  {longitude: 177.353425, latitude: -38.624558},
  {longitude: 177.307561, latitude: -38.659704},
  {longitude: 177.122171, latitude: -38.583921},
  {longitude: 177.152469, latitude: -38.583781},
  {longitude: 177.204179, latitude: -38.524282},
  {longitude: 177.257394, latitude: -38.508277},
  {longitude: 177.236922, latitude: -38.426342},
  {longitude: 177.463688, latitude: -38.333536},
  {longitude: 177.486299, latitude: -38.296268},
  {longitude: 177.495597, latitude: -38.222694},
  {longitude: 177.604789, latitude: -38.186621},
  {longitude: 177.653591, latitude: -38.158585},
  {longitude: 177.692068, latitude: -38.108278},
  {longitude: 177.694136, latitude: -38.053444},
  {longitude: 177.739984, latitude: -38.042047},
  {longitude: 177.860967, latitude: -38.111656},
  {longitude: 177.972292, latitude: -37.845005},
  {longitude: 178.073007, latitude: -37.76359},
  {longitude: 178.038707, latitude: -37.733116},
  {longitude: 177.996622, latitude: -37.760276},
  {longitude: 177.986683, latitude: -37.608757},
  {longitude: 178.107555, latitude: -37.598716},
  {longitude: 178.085284, latitude: -37.542391},
  {longitude: 178.163939, latitude: -37.552538},
  {longitude: 178.174634, latitude: -37.534658},
  {longitude: 178.276302, latitude: -37.554487},
  {longitude: 178.301396, latitude: -37.596238},
  {longitude: 178.363711, latitude: -37.631004},
  {longitude: 178.482593, latitude: -37.641097},
  {longitude: 178.550392, latitude: -37.691969},
  {longitude: 178.523777, latitude: -37.73371},
  {longitude: 178.415858, latitude: -37.858044},
  {longitude: 178.388746, latitude: -37.917298},
  {longitude: 178.391299, latitude: -37.9614},
  {longitude: 178.337262, latitude: -38.009547},
  {longitude: 178.370262, latitude: -38.048786},
  {longitude: 178.373573, latitude: -38.094521},
  {longitude: 178.321955, latitude: -38.122191},
  {longitude: 178.33837, latitude: -38.191707},
  {longitude: 178.31241, latitude: -38.241549},
  {longitude: 178.332831, latitude: -38.259551},
  {longitude: 178.322995, latitude: -38.315845},
  {longitude: 178.344519, latitude: -38.418465},
  {longitude: 178.281772, latitude: -38.472176},
  {longitude: 178.293041, latitude: -38.526928},
  {longitude: 178.23071, latitude: -38.565469},
  {longitude: 178.198843, latitude: -38.605509},
  {longitude: 178.05004, latitude: -38.702083},
  {longitude: 178.020522, latitude: -38.672634},
  {longitude: 177.97273, latitude: -38.681261},
  {longitude: 177.935404, latitude: -38.71997},
  {longitude: 177.950425, latitude: -38.764994},
  {longitude: 177.911783, latitude: -38.827925},
  {longitude: 177.916977, latitude: -38.872067},
  {longitude: 177.898993, latitude: -38.971833},
];
const taranakiGeoCoordinates = [
  {longitude: 174.615147, latitude: -38.706648},
  {longitude: 174.655191, latitude: -38.733283},
  {longitude: 174.756114, latitude: -38.744958},
  {longitude: 174.79196, latitude: -38.731777},
  {longitude: 174.81987, latitude: -38.787517},
  {longitude: 174.798771, latitude: -38.865267},
  {longitude: 174.831943, latitude: -38.904388},
  {longitude: 174.87116, latitude: -38.890445},
  {longitude: 174.88264, latitude: -38.970397},
  {longitude: 174.959376, latitude: -39.001466},
  {longitude: 174.976095, latitude: -39.062822},
  {longitude: 175.047306, latitude: -39.070358},
  {longitude: 174.940771, latitude: -39.179219},
  {longitude: 174.910876, latitude: -39.234239},
  {longitude: 174.864974, latitude: -39.246928},
  {longitude: 174.814369, latitude: -39.313935},
  {longitude: 174.891669, latitude: -39.35824},
  {longitude: 174.871268, latitude: -39.400945},
  {longitude: 174.928496, latitude: -39.47615},
  {longitude: 174.967387, latitude: -39.48628},
  {longitude: 174.972629, latitude: -39.653146},
  {longitude: 174.923156, latitude: -39.696321},
  {longitude: 174.930618, latitude: -39.724479},
  {longitude: 174.834535, latitude: -39.80049},
  {longitude: 174.803467, latitude: -39.802807},
  {longitude: 174.784082, latitude: -39.857977},
  {longitude: 174.71657, latitude: -39.867206},
  {longitude: 174.667892, latitude: -39.842788},
  {longitude: 174.558875, latitude: -39.817444},
  {longitude: 174.444515, latitude: -39.750661},
  {longitude: 174.35271, latitude: -39.659078},
  {longitude: 174.201536, latitude: -39.588084},
  {longitude: 174.076819, latitude: -39.57734},
  {longitude: 173.98726, latitude: -39.554193},
  {longitude: 173.910846, latitude: -39.514804},
  {longitude: 173.855922, latitude: -39.457174},
  {longitude: 173.794989, latitude: -39.415064},
  {longitude: 173.751444, latitude: -39.279312},
  {longitude: 173.794817, latitude: -39.192495},
  {longitude: 173.909613, latitude: -39.121109},
  {longitude: 173.948379, latitude: -39.114951},
  {longitude: 174.041259, latitude: -39.060641},
  {longitude: 174.089499, latitude: -39.050754},
  {longitude: 174.200853, latitude: -38.988452},
  {longitude: 174.311658, latitude: -38.982826},
  {longitude: 174.389996, latitude: -38.988831},
  {longitude: 174.435845, latitude: -38.962985},
  {longitude: 174.507733, latitude: -38.890298},
  {longitude: 174.559947, latitude: -38.855914},
  {longitude: 174.59044, latitude: -38.79922},
  {longitude: 174.615147, latitude: -38.706648},
];
const hawkeBayGeoCoordinates = [
  {longitude: 177.898993, latitude: -38.971833},
  {longitude: 177.887127, latitude: -39.031957},
  {longitude: 177.9018, latitude: -39.072959},
  {longitude: 177.999697, latitude: -39.113874},
  {longitude: 177.924319, latitude: -39.170129},
  {longitude: 177.906174, latitude: -39.226276},
  {longitude: 177.850842, latitude: -39.23345},
  {longitude: 177.839269, latitude: -39.152328},
  {longitude: 177.870902, latitude: -39.087698},
  {longitude: 177.755965, latitude: -39.058676},
  {longitude: 177.636631, latitude: -39.050461},
  {longitude: 177.450278, latitude: -39.058632},
  {longitude: 177.259162, latitude: -39.100663},
  {longitude: 177.159041, latitude: -39.136592},
  {longitude: 177.046118, latitude: -39.193937},
  {longitude: 177.036009, latitude: -39.23221},
  {longitude: 176.989527, latitude: -39.294003},
  {longitude: 176.919394, latitude: -39.340023},
  {longitude: 176.876375, latitude: -39.422661},
  {longitude: 176.891073, latitude: -39.480243},
  {longitude: 176.924204, latitude: -39.476151},
  {longitude: 176.922248, latitude: -39.549584},
  {longitude: 176.97975, latitude: -39.632051},
  {longitude: 177.075499, latitude: -39.673259},
  {longitude: 177.011022, latitude: -39.742715},
  {longitude: 176.993545, latitude: -39.81072},
  {longitude: 177.005106, latitude: -39.835942},
  {longitude: 176.932128, latitude: -39.93529},
  {longitude: 176.888223, latitude: -40.025526},
  {longitude: 176.868992, latitude: -40.13139},
  {longitude: 176.794397, latitude: -40.205335},
  {longitude: 176.687031, latitude: -40.256393},
  {longitude: 176.622569, latitude: -40.428017},
  {longitude: 176.443295, latitude: -40.407389},
  {longitude: 176.370644, latitude: -40.358621},
  {longitude: 176.405846, latitude: -40.333032},
  {longitude: 176.360017, latitude: -40.196532},
  {longitude: 176.378606, latitude: -40.158141},
  {longitude: 176.309103, latitude: -40.11916},
  {longitude: 176.323214, latitude: -40.093717},
  {longitude: 176.262241, latitude: -40.045098},
  {longitude: 176.204971, latitude: -40.018995},
  {longitude: 176.136627, latitude: -40.028578},
  {longitude: 176.093831, latitude: -39.995503},
  {longitude: 176.123973, latitude: -39.947893},
  {longitude: 176.117204, latitude: -39.886767},
  {longitude: 176.176853, latitude: -39.744049},
  {longitude: 176.195938, latitude: -39.663571},
  {longitude: 176.165093, latitude: -39.648654},
  {longitude: 176.174224, latitude: -39.578815},
  {longitude: 176.210856, latitude: -39.53321},
  {longitude: 176.320626, latitude: -39.497618},
  {longitude: 176.305104, latitude: -39.443916},
  {longitude: 176.326208, latitude: -39.406562},
  {longitude: 176.279933, latitude: -39.312359},
  {longitude: 176.305055, latitude: -39.29192},
  {longitude: 176.289736, latitude: -39.24637},
  {longitude: 176.20081, latitude: -39.226045},
  {longitude: 176.176124, latitude: -39.143901},
  {longitude: 176.233225, latitude: -39.097875},
  {longitude: 176.340355, latitude: -39.173115},
  {longitude: 176.386854, latitude: -39.13658},
  {longitude: 176.443493, latitude: -39.120805},
  {longitude: 176.420177, latitude: -39.061939},
  {longitude: 176.449226, latitude: -39.001619},
  {longitude: 176.610356, latitude: -38.998264},
  {longitude: 176.598465, latitude: -38.933293},
  {longitude: 176.697713, latitude: -38.855956},
  {longitude: 176.717283, latitude: -38.724524},
  {longitude: 176.766747, latitude: -38.68931},
  {longitude: 176.878668, latitude: -38.667135},
  {longitude: 176.928205, latitude: -38.697575},
  {longitude: 176.991448, latitude: -38.693695},
  {longitude: 177.04598, latitude: -38.620802},
  {longitude: 177.094735, latitude: -38.618336},
  {longitude: 177.122171, latitude: -38.583921},
  {longitude: 177.307561, latitude: -38.659704},
  {longitude: 177.353425, latitude: -38.624558},
  {longitude: 177.447818, latitude: -38.635892},
  {longitude: 177.434478, latitude: -38.69381},
  {longitude: 177.462253, latitude: -38.704805},
  {longitude: 177.494212, latitude: -38.777974},
  {longitude: 177.597523, latitude: -38.807041},
  {longitude: 177.599781, latitude: -38.851898},
  {longitude: 177.66049, latitude: -38.848942},
  {longitude: 177.660164, latitude: -38.904701},
  {longitude: 177.749235, latitude: -38.896674},
  {longitude: 177.844528, latitude: -38.921503},
  {longitude: 177.834797, latitude: -38.952779},
  {longitude: 177.898993, latitude: -38.971833},
];
const whanganuiGeoCoordinates = [
  {longitude: 176.176124, latitude: -39.143901},
  {longitude: 176.20081, latitude: -39.226045},
  {longitude: 176.289736, latitude: -39.24637},
  {longitude: 176.305055, latitude: -39.29192},
  {longitude: 176.279933, latitude: -39.312359},
  {longitude: 176.326208, latitude: -39.406562},
  {longitude: 176.305104, latitude: -39.443916},
  {longitude: 176.320626, latitude: -39.497618},
  {longitude: 176.210856, latitude: -39.53321},
  {longitude: 176.174224, latitude: -39.578815},
  {longitude: 176.165093, latitude: -39.648654},
  {longitude: 176.195938, latitude: -39.663571},
  {longitude: 176.176853, latitude: -39.744049},
  {longitude: 176.117204, latitude: -39.886767},
  {longitude: 176.019108, latitude: -39.840414},
  {longitude: 175.963483, latitude: -39.846095},
  {longitude: 175.868378, latitude: -39.798626},
  {longitude: 175.789122, latitude: -39.812487},
  {longitude: 175.726867, latitude: -39.872033},
  {longitude: 175.694452, latitude: -39.874594},
  {longitude: 175.646195, latitude: -39.916821},
  {longitude: 175.630734, latitude: -39.966469},
  {longitude: 175.595762, latitude: -39.99842},
  {longitude: 175.510315, latitude: -40.02734},
  {longitude: 175.49225, latitude: -40.067293},
  {longitude: 175.441778, latitude: -40.09513},
  {longitude: 175.433153, latitude: -40.158614},
  {longitude: 175.340483, latitude: -40.206348},
  {longitude: 175.321556, latitude: -40.251116},
  {longitude: 175.267882, latitude: -40.296202},
  {longitude: 175.221623, latitude: -40.286343},
  {longitude: 175.198135, latitude: -40.176542},
  {longitude: 175.162541, latitude: -40.107169},
  {longitude: 175.045463, latitude: -39.985457},
  {longitude: 174.942547, latitude: -39.907772},
  {longitude: 174.869328, latitude: -39.874206},
  {longitude: 174.784082, latitude: -39.857977},
  {longitude: 174.803467, latitude: -39.802807},
  {longitude: 174.834535, latitude: -39.80049},
  {longitude: 174.930618, latitude: -39.724479},
  {longitude: 174.923156, latitude: -39.696321},
  {longitude: 174.972629, latitude: -39.653146},
  {longitude: 174.967387, latitude: -39.48628},
  {longitude: 174.928496, latitude: -39.47615},
  {longitude: 174.871268, latitude: -39.400945},
  {longitude: 174.891669, latitude: -39.35824},
  {longitude: 174.814369, latitude: -39.313935},
  {longitude: 174.864974, latitude: -39.246928},
  {longitude: 174.910876, latitude: -39.234239},
  {longitude: 174.940771, latitude: -39.179219},
  {longitude: 175.070139, latitude: -39.172383},
  {longitude: 175.158361, latitude: -39.190419},
  {longitude: 175.194729, latitude: -39.166361},
  {longitude: 175.265096, latitude: -39.275236},
  {longitude: 175.379851, latitude: -39.277052},
  {longitude: 175.489522, latitude: -39.258044},
  {longitude: 175.557854, latitude: -39.275998},
  {longitude: 175.669212, latitude: -39.296934},
  {longitude: 175.751846, latitude: -39.287877},
  {longitude: 175.812569, latitude: -39.300326},
  {longitude: 175.885971, latitude: -39.205895},
  {longitude: 175.955889, latitude: -39.186422},
  {longitude: 175.975963, latitude: -39.150023},
  {longitude: 176.044065, latitude: -39.156917},
  {longitude: 176.176124, latitude: -39.143901},
];
const midCentralGeoCoordinates = [
  {longitude: 176.117204, latitude: -39.886767},
  {longitude: 176.123973, latitude: -39.947893},
  {longitude: 176.093831, latitude: -39.995503},
  {longitude: 176.136627, latitude: -40.028578},
  {longitude: 176.204971, latitude: -40.018995},
  {longitude: 176.262241, latitude: -40.045098},
  {longitude: 176.323214, latitude: -40.093717},
  {longitude: 176.309103, latitude: -40.11916},
  {longitude: 176.378606, latitude: -40.158141},
  {longitude: 176.360017, latitude: -40.196532},
  {longitude: 176.405846, latitude: -40.333032},
  {longitude: 176.370644, latitude: -40.358621},
  {longitude: 176.443295, latitude: -40.407389},
  {longitude: 176.622569, latitude: -40.428017},
  {longitude: 176.620794, latitude: -40.491777},
  {longitude: 176.551459, latitude: -40.499187},
  {longitude: 176.493457, latitude: -40.5305},
  {longitude: 176.309602, latitude: -40.716653},
  {longitude: 176.270526, latitude: -40.780825},
  {longitude: 176.222445, latitude: -40.703193},
  {longitude: 176.09385, latitude: -40.675134},
  {longitude: 176.082334, latitude: -40.708153},
  {longitude: 176.022449, latitude: -40.711489},
  {longitude: 175.975475, latitude: -40.738325},
  {longitude: 175.909854, latitude: -40.750931},
  {longitude: 175.871637, latitude: -40.777905},
  {longitude: 175.764739, latitude: -40.768091},
  {longitude: 175.790746, latitude: -40.725597},
  {longitude: 175.77011, latitude: -40.698888},
  {longitude: 175.69065, latitude: -40.696562},
  {longitude: 175.653222, latitude: -40.742489},
  {longitude: 175.560538, latitude: -40.728763},
  {longitude: 175.473444, latitude: -40.693397},
  {longitude: 175.439644, latitude: -40.744152},
  {longitude: 175.405219, latitude: -40.752087},
  {longitude: 175.353888, latitude: -40.82664},
  {longitude: 175.361075, latitude: -40.872932},
  {longitude: 175.333749, latitude: -40.913906},
  {longitude: 175.270224, latitude: -40.938951},
  {longitude: 175.261125, latitude: -40.970876},
  {longitude: 175.150863, latitude: -40.967142},
  {longitude: 175.188526, latitude: -40.867117},
  {longitude: 175.127456, latitude: -40.843885},
  {longitude: 175.076423, latitude: -40.802409},
  {longitude: 175.154208, latitude: -40.663998},
  {longitude: 175.190707, latitude: -40.566923},
  {longitude: 175.227058, latitude: -40.398075},
  {longitude: 175.221623, latitude: -40.286343},
  {longitude: 175.267882, latitude: -40.296202},
  {longitude: 175.321556, latitude: -40.251116},
  {longitude: 175.340483, latitude: -40.206348},
  {longitude: 175.433153, latitude: -40.158614},
  {longitude: 175.441778, latitude: -40.09513},
  {longitude: 175.49225, latitude: -40.067293},
  {longitude: 175.510315, latitude: -40.02734},
  {longitude: 175.595762, latitude: -39.99842},
  {longitude: 175.630734, latitude: -39.966469},
  {longitude: 175.646195, latitude: -39.916821},
  {longitude: 175.694452, latitude: -39.874594},
  {longitude: 175.726867, latitude: -39.872033},
  {longitude: 175.789122, latitude: -39.812487},
  {longitude: 175.868378, latitude: -39.798626},
  {longitude: 175.963483, latitude: -39.846095},
  {longitude: 176.019108, latitude: -39.840414},
  {longitude: 176.117204, latitude: -39.886767},
];
const huttValleyGeoCoordinates = [
  {longitude: 175.150863, latitude: -40.967142},
  {longitude: 175.261125, latitude: -40.970876},
  {longitude: 175.306225, latitude: -40.989685},
  {longitude: 175.26529, latitude: -41.026013},
  {longitude: 175.232973, latitude: -41.116744},
  {longitude: 175.152244, latitude: -41.201855},
  {longitude: 175.095463, latitude: -41.212371},
  {longitude: 175.086998, latitude: -41.278235},
  {longitude: 175.022505, latitude: -41.341323},
  {longitude: 174.986062, latitude: -41.395952},
  {longitude: 174.924174, latitude: -41.434703},
  {longitude: 174.868299, latitude: -41.409388},
  {longitude: 174.847848, latitude: -41.359484},
  {longitude: 174.912076, latitude: -41.25971},
  {longitude: 174.850359, latitude: -41.227326},
  {longitude: 174.899203, latitude: -41.147902},
  {longitude: 174.948747, latitude: -41.153086},
  {longitude: 174.989885, latitude: -41.122408},
  {longitude: 174.967997, latitude: -41.060298},
  {longitude: 174.97969, latitude: -41.013315},
  {longitude: 175.04937, latitude: -40.969626},
  {longitude: 175.129186, latitude: -40.949343},
  {longitude: 175.150863, latitude: -40.967142},
];
const capitalAndCoastGeoCoordinates = [
  {longitude: 175.150863, latitude: -40.967142},
  {longitude: 175.129186, latitude: -40.949343},
  {longitude: 175.04937, latitude: -40.969626},
  {longitude: 174.97969, latitude: -41.013315},
  {longitude: 174.967997, latitude: -41.060298},
  {longitude: 174.989885, latitude: -41.122408},
  {longitude: 174.948747, latitude: -41.153086},
  {longitude: 174.899203, latitude: -41.147902},
  {longitude: 174.850359, latitude: -41.227326},
  {longitude: 174.785975, latitude: -41.265183},
  {longitude: 174.810138, latitude: -41.31549},
  {longitude: 174.765699, latitude: -41.348959},
  {longitude: 174.70511, latitude: -41.35711},
  {longitude: 174.660787, latitude: -41.340375},
  {longitude: 174.61327, latitude: -41.285538},
  {longitude: 174.623053, latitude: -41.260256},
  {longitude: 174.711227, latitude: -41.219937},
  {longitude: 174.804665, latitude: -41.111296},
  {longitude: 174.867168, latitude: -41.086739},
  {longitude: 174.846312, latitude: -41.049911},
  {longitude: 174.938623, latitude: -41.000454},
  {longitude: 174.972433, latitude: -40.944292},
  {longitude: 174.97819, latitude: -40.895957},
  {longitude: 175.076423, latitude: -40.802409},
  {longitude: 175.127456, latitude: -40.843885},
  {longitude: 175.188526, latitude: -40.867117},
  {longitude: 175.150863, latitude: -40.967142},
];
const wairarapaGeoCoordinates = [
  {longitude: 176.270526, latitude: -40.780825},
  {longitude: 176.219492, latitude: -40.911812},
  {longitude: 176.154899, latitude: -40.948151},
  {longitude: 176.106926, latitude: -41.015221},
  {longitude: 176.062479, latitude: -41.131016},
  {longitude: 175.998743, latitude: -41.177433},
  {longitude: 175.961836, latitude: -41.244775},
  {longitude: 175.90319, latitude: -41.261237},
  {longitude: 175.862869, latitude: -41.317013},
  {longitude: 175.808914, latitude: -41.361552},
  {longitude: 175.675584, latitude: -41.413795},
  {longitude: 175.585186, latitude: -41.487373},
  {longitude: 175.5331, latitude: -41.496545},
  {longitude: 175.433381, latitude: -41.568836},
  {longitude: 175.365302, latitude: -41.571881},
  {longitude: 175.325407, latitude: -41.605959},
  {longitude: 175.236423, latitude: -41.605166},
  {longitude: 175.195284, latitude: -41.523803},
  {longitude: 175.216735, latitude: -41.431577},
  {longitude: 175.12065, latitude: -41.389323},
  {longitude: 175.043268, latitude: -41.373317},
  {longitude: 174.986062, latitude: -41.395952},
  {longitude: 175.022505, latitude: -41.341323},
  {longitude: 175.086998, latitude: -41.278235},
  {longitude: 175.095463, latitude: -41.212371},
  {longitude: 175.152244, latitude: -41.201855},
  {longitude: 175.232973, latitude: -41.116744},
  {longitude: 175.26529, latitude: -41.026013},
  {longitude: 175.306225, latitude: -40.989685},
  {longitude: 175.261125, latitude: -40.970876},
  {longitude: 175.270224, latitude: -40.938951},
  {longitude: 175.333749, latitude: -40.913906},
  {longitude: 175.361075, latitude: -40.872932},
  {longitude: 175.353888, latitude: -40.82664},
  {longitude: 175.405219, latitude: -40.752087},
  {longitude: 175.439644, latitude: -40.744152},
  {longitude: 175.473444, latitude: -40.693397},
  {longitude: 175.560538, latitude: -40.728763},
  {longitude: 175.653222, latitude: -40.742489},
  {longitude: 175.69065, latitude: -40.696562},
  {longitude: 175.77011, latitude: -40.698888},
  {longitude: 175.790746, latitude: -40.725597},
  {longitude: 175.764739, latitude: -40.768091},
  {longitude: 175.871637, latitude: -40.777905},
  {longitude: 175.909854, latitude: -40.750931},
  {longitude: 175.975475, latitude: -40.738325},
  {longitude: 176.022449, latitude: -40.711489},
  {longitude: 176.082334, latitude: -40.708153},
  {longitude: 176.09385, latitude: -40.675134},
  {longitude: 176.222445, latitude: -40.703193},
  {longitude: 176.270526, latitude: -40.780825},
];
const nelsonMarlboroughGeoCoordinates = [
  {longitude: 174.048787, latitude: -41.968109},
  {longitude: 173.944307, latitude: -41.91218},
  {longitude: 173.817254, latitude: -41.932997},
  {longitude: 173.789409, latitude: -41.958198},
  {longitude: 173.74438, latitude: -41.907383},
  {longitude: 173.72021, latitude: -41.960771},
  {longitude: 173.499107, latitude: -42.078737},
  {longitude: 173.466949, latitude: -42.125096},
  {longitude: 173.48481, latitude: -42.17856},
  {longitude: 173.464463, latitude: -42.195674},
  {longitude: 173.312201, latitude: -42.250382},
  {longitude: 173.244525, latitude: -42.303104},
  {longitude: 173.189896, latitude: -42.410546},
  {longitude: 173.15232, latitude: -42.449603},
  {longitude: 173.106251, latitude: -42.447681},
  {longitude: 173.035789, latitude: -42.483471},
  {longitude: 172.992906, latitude: -42.40385},
  {longitude: 172.941393, latitude: -42.377825},
  {longitude: 172.914145, latitude: -42.308609},
  {longitude: 172.842436, latitude: -42.289184},
  {longitude: 172.82329, latitude: -42.204707},
  {longitude: 172.795642, latitude: -42.179225},
  {longitude: 172.721548, latitude: -42.158537},
  {longitude: 172.721473, latitude: -42.103492},
  {longitude: 172.639183, latitude: -42.100795},
  {longitude: 172.611996, latitude: -42.157802},
  {longitude: 172.614713, latitude: -42.195463},
  {longitude: 172.559193, latitude: -42.220088},
  {longitude: 172.479031, latitude: -42.277029},
  {longitude: 172.438676, latitude: -42.301756},
  {longitude: 172.369594, latitude: -42.280603},
  {longitude: 172.335707, latitude: -42.234345},
  {longitude: 172.33195, latitude: -42.150639},
  {longitude: 172.260995, latitude: -42.148312},
  {longitude: 172.205688, latitude: -42.102838},
  {longitude: 172.135204, latitude: -42.104044},
  {longitude: 172.052127, latitude: -41.945182},
  {longitude: 172.115731, latitude: -41.868405},
  {longitude: 172.117863, latitude: -41.756229},
  {longitude: 172.129322, latitude: -41.714002},
  {longitude: 172.247079, latitude: -41.684218},
  {longitude: 172.238131, latitude: -41.639518},
  {longitude: 172.320665, latitude: -41.610287},
  {longitude: 172.34246, latitude: -41.513161},
  {longitude: 172.418018, latitude: -41.471659},
  {longitude: 172.419659, latitude: -41.410461},
  {longitude: 172.504571, latitude: -41.408706},
  {longitude: 172.584362, latitude: -41.376194},
  {longitude: 172.579785, latitude: -41.254107},
  {longitude: 172.657938, latitude: -41.239169},
  {longitude: 172.618005, latitude: -41.159896},
  {longitude: 172.492092, latitude: -41.064741},
  {longitude: 172.493938, latitude: -41.024524},
  {longitude: 172.383599, latitude: -41.022433},
  {longitude: 172.350909, latitude: -41.061675},
  {longitude: 172.310335, latitude: -41.013558},
  {longitude: 172.370078, latitude: -40.970752},
  {longitude: 172.229036, latitude: -40.855881},
  {longitude: 172.247832, latitude: -40.804617},
  {longitude: 172.217805, latitude: -40.774543},
  {longitude: 172.030696, latitude: -40.628352},
  {longitude: 172.134184, latitude: -40.582054},
  {longitude: 172.238211, latitude: -40.500984},
  {longitude: 172.485038, latitude: -40.346648},
  {longitude: 172.596767, latitude: -40.307859},
  {longitude: 172.661842, latitude: -40.299164},
  {longitude: 172.839963, latitude: -40.301754},
  {longitude: 173.009999, latitude: -40.322897},
  {longitude: 173.162239, latitude: -40.374765},
  {longitude: 173.273206, latitude: -40.450611},
  {longitude: 173.32797, latitude: -40.525173},
  {longitude: 173.340234, latitude: -40.620472},
  {longitude: 173.289002, latitude: -40.749244},
  {longitude: 173.361031, latitude: -40.805375},
  {longitude: 173.205753, latitude: -41.299344},
  {longitude: 173.29493, latitude: -41.236009},
  {longitude: 173.324648, latitude: -41.202078},
  {longitude: 173.404571, latitude: -41.156605},
  {longitude: 173.48227, latitude: -41.157006},
  {longitude: 173.509307, latitude: -41.111972},
  {longitude: 173.545933, latitude: -41.097309},
  {longitude: 173.82153, latitude: -40.746153},
  {longitude: 174.000343, latitude: -40.65053},
  {longitude: 174.458119, latitude: -41.102757},
  {longitude: 174.383453, latitude: -41.201298},
  {longitude: 174.246993, latitude: -41.325936},
  {longitude: 174.156148, latitude: -41.358693},
  {longitude: 174.090197, latitude: -41.359327},
  {longitude: 174.048448, latitude: -41.39311},
  {longitude: 174.033536, latitude: -41.476347},
  {longitude: 174.151156, latitude: -41.561231},
  {longitude: 174.156961, latitude: -41.64767},
  {longitude: 174.198299, latitude: -41.723235},
  {longitude: 174.275035, latitude: -41.742887},
  {longitude: 174.217997, latitude: -41.792119},
  {longitude: 174.196758, latitude: -41.835604},
  {longitude: 174.048787, latitude: -41.968109},
];
const westCoastGeoCoordinates = [
  {longitude: 172.479031, latitude: -42.277029},
  {longitude: 172.444257, latitude: -42.365964},
  {longitude: 172.348261, latitude: -42.39139},
  {longitude: 172.293406, latitude: -42.440141},
  {longitude: 172.235514, latitude: -42.456727},
  {longitude: 172.133001, latitude: -42.555206},
  {longitude: 172.094375, latitude: -42.620448},
  {longitude: 171.974953, latitude: -42.638993},
  {longitude: 171.915639, latitude: -42.68173},
  {longitude: 171.883945, latitude: -42.738445},
  {longitude: 171.841774, latitude: -42.774556},
  {longitude: 171.763849, latitude: -42.791722},
  {longitude: 171.74637, latitude: -42.874081},
  {longitude: 171.69067, latitude: -42.900827},
  {longitude: 171.590385, latitude: -42.895629},
  {longitude: 171.517583, latitude: -42.914098},
  {longitude: 171.449227, latitude: -42.909228},
  {longitude: 171.41163, latitude: -42.950759},
  {longitude: 171.316265, latitude: -42.947496},
  {longitude: 171.237669, latitude: -43.002511},
  {longitude: 171.239866, latitude: -43.03287},
  {longitude: 171.197689, latitude: -43.074257},
  {longitude: 171.079331, latitude: -43.102301},
  {longitude: 170.993271, latitude: -43.215314},
  {longitude: 170.928733, latitude: -43.206535},
  {longitude: 170.830348, latitude: -43.283511},
  {longitude: 170.761984, latitude: -43.317573},
  {longitude: 170.705699, latitude: -43.320787},
  {longitude: 170.64581, latitude: -43.370529},
  {longitude: 170.615575, latitude: -43.431521},
  {longitude: 170.528962, latitude: -43.410302},
  {longitude: 170.475363, latitude: -43.43311},
  {longitude: 170.395292, latitude: -43.498051},
  {longitude: 170.322861, latitude: -43.490349},
  {longitude: 170.238421, latitude: -43.513827},
  {longitude: 170.182698, latitude: -43.561281},
  {longitude: 170.098131, latitude: -43.595479},
  {longitude: 170.091408, latitude: -43.660373},
  {longitude: 170.028115, latitude: -43.691237},
  {longitude: 170.029438, latitude: -43.724524},
  {longitude: 169.963938, latitude: -43.791583},
  {longitude: 169.867395, latitude: -43.832166},
  {longitude: 169.837905, latitude: -43.866631},
  {longitude: 169.771156, latitude: -43.899165},
  {longitude: 169.758299, latitude: -43.933671},
  {longitude: 169.698531, latitude: -43.963324},
  {longitude: 169.592781, latitude: -43.958076},
  {longitude: 169.591376, latitude: -44.012536},
  {longitude: 169.511997, latitude: -44.057813},
  {longitude: 169.372957, latitude: -44.116991},
  {longitude: 169.320705, latitude: -44.063797},
  {longitude: 169.275179, latitude: -44.098581},
  {longitude: 169.188798, latitude: -44.110547},
  {longitude: 169.147102, latitude: -44.080217},
  {longitude: 169.07897, latitude: -44.098363},
  {longitude: 168.975078, latitude: -44.144029},
  {longitude: 168.963356, latitude: -44.199936},
  {longitude: 168.877231, latitude: -44.222841},
  {longitude: 168.849166, latitude: -44.246672},
  {longitude: 168.836084, latitude: -44.339918},
  {longitude: 168.728392, latitude: -44.419478},
  {longitude: 168.687141, latitude: -44.391848},
  {longitude: 168.625503, latitude: -44.433935},
  {longitude: 168.506806, latitude: -44.466815},
  {longitude: 168.460042, latitude: -44.495335},
  {longitude: 168.333783, latitude: -44.488389},
  {longitude: 168.366239, latitude: -44.418918},
  {longitude: 168.407364, latitude: -44.375115},
  {longitude: 168.349075, latitude: -44.330482},
  {longitude: 168.347349, latitude: -44.284238},
  {longitude: 168.224959, latitude: -44.256824},
  {longitude: 168.131929, latitude: -44.281194},
  {longitude: 168.05208, latitude: -44.258648},
  {longitude: 168.103564, latitude: -44.243241},
  {longitude: 168.153258, latitude: -44.202369},
  {longitude: 168.247771, latitude: -44.156899},
  {longitude: 168.327532, latitude: -44.049466},
  {longitude: 168.389256, latitude: -44.002481},
  {longitude: 168.512573, latitude: -44.001895},
  {longitude: 168.596033, latitude: -43.972545},
  {longitude: 168.653195, latitude: -43.995752},
  {longitude: 168.709529, latitude: -43.994247},
  {longitude: 168.836078, latitude: -43.956068},
  {longitude: 168.888444, latitude: -43.905374},
  {longitude: 168.969334, latitude: -43.878461},
  {longitude: 169.102972, latitude: -43.797593},
  {longitude: 169.209384, latitude: -43.719299},
  {longitude: 169.427097, latitude: -43.625399},
  {longitude: 169.514353, latitude: -43.621409},
  {longitude: 169.591671, latitude: -43.599018},
  {longitude: 169.650004, latitude: -43.55328},
  {longitude: 169.690794, latitude: -43.543091},
  {longitude: 169.793602, latitude: -43.421525},
  {longitude: 169.841934, latitude: -43.395443},
  {longitude: 169.918274, latitude: -43.389166},
  {longitude: 169.981234, latitude: -43.35782},
  {longitude: 170.050895, latitude: -43.291899},
  {longitude: 170.165463, latitude: -43.220211},
  {longitude: 170.257082, latitude: -43.11938},
  {longitude: 170.341655, latitude: -43.096679},
  {longitude: 170.420541, latitude: -43.036161},
  {longitude: 170.524389, latitude: -43.017394},
  {longitude: 170.616308, latitude: -42.983007},
  {longitude: 170.720656, latitude: -42.930291},
  {longitude: 170.867846, latitude: -42.822805},
  {longitude: 170.94796, latitude: -42.723274},
  {longitude: 171.051014, latitude: -42.650688},
  {longitude: 171.167347, latitude: -42.507809},
  {longitude: 171.218172, latitude: -42.38102},
  {longitude: 171.242958, latitude: -42.369885},
  {longitude: 171.304562, latitude: -42.267214},
  {longitude: 171.321142, latitude: -42.153247},
  {longitude: 171.366001, latitude: -42.035483},
  {longitude: 171.391567, latitude: -42.021377},
  {longitude: 171.417932, latitude: -41.917757},
  {longitude: 171.45598, latitude: -41.882489},
  {longitude: 171.462322, latitude: -41.749777},
  {longitude: 171.555903, latitude: -41.748395},
  {longitude: 171.58767, latitude: -41.731532},
  {longitude: 171.654682, latitude: -41.741963},
  {longitude: 171.716596, latitude: -41.716951},
  {longitude: 171.828431, latitude: -41.647044},
  {longitude: 171.882088, latitude: -41.600676},
  {longitude: 171.987652, latitude: -41.445727},
  {longitude: 172.063382, latitude: -41.38407},
  {longitude: 172.081854, latitude: -41.329332},
  {longitude: 172.103629, latitude: -41.190743},
  {longitude: 172.10013, latitude: -41.096942},
  {longitude: 172.111074, latitude: -41.03719},
  {longitude: 172.094502, latitude: -40.91625},
  {longitude: 172.133988, latitude: -40.850622},
  {longitude: 172.217805, latitude: -40.774543},
  {longitude: 172.247832, latitude: -40.804617},
  {longitude: 172.229036, latitude: -40.855881},
  {longitude: 172.370078, latitude: -40.970752},
  {longitude: 172.310335, latitude: -41.013558},
  {longitude: 172.350909, latitude: -41.061675},
  {longitude: 172.383599, latitude: -41.022433},
  {longitude: 172.493938, latitude: -41.024524},
  {longitude: 172.492092, latitude: -41.064741},
  {longitude: 172.618005, latitude: -41.159896},
  {longitude: 172.657938, latitude: -41.239169},
  {longitude: 172.579785, latitude: -41.254107},
  {longitude: 172.584362, latitude: -41.376194},
  {longitude: 172.504571, latitude: -41.408706},
  {longitude: 172.419659, latitude: -41.410461},
  {longitude: 172.418018, latitude: -41.471659},
  {longitude: 172.34246, latitude: -41.513161},
  {longitude: 172.320665, latitude: -41.610287},
  {longitude: 172.238131, latitude: -41.639518},
  {longitude: 172.247079, latitude: -41.684218},
  {longitude: 172.129322, latitude: -41.714002},
  {longitude: 172.117863, latitude: -41.756229},
  {longitude: 172.115731, latitude: -41.868405},
  {longitude: 172.052127, latitude: -41.945182},
  {longitude: 172.135204, latitude: -42.104044},
  {longitude: 172.205688, latitude: -42.102838},
  {longitude: 172.260995, latitude: -42.148312},
  {longitude: 172.33195, latitude: -42.150639},
  {longitude: 172.335707, latitude: -42.234345},
  {longitude: 172.369594, latitude: -42.280603},
  {longitude: 172.438676, latitude: -42.301756},
  {longitude: 172.479031, latitude: -42.277029},
];
const canterburyGeoCoordinates = [
  {longitude: 174.048787, latitude: -41.968109},
  {longitude: 173.9666, latitude: -42.0447},
  {longitude: 173.892545, latitude: -42.189221},
  {longitude: 173.807735, latitude: -42.26531},
  {longitude: 173.752961, latitude: -42.292069},
  {longitude: 173.750008, latitude: -42.319293},
  {longitude: 173.698016, latitude: -42.351045},
  {longitude: 173.671647, latitude: -42.412953},
  {longitude: 173.594467, latitude: -42.428445},
  {longitude: 173.509532, latitude: -42.505293},
  {longitude: 173.479399, latitude: -42.592716},
  {longitude: 173.368426, latitude: -42.79882},
  {longitude: 173.320265, latitude: -42.842197},
  {longitude: 173.305864, latitude: -42.889456},
  {longitude: 173.241652, latitude: -42.952865},
  {longitude: 173.144984, latitude: -42.986431},
  {longitude: 173.080542, latitude: -43.050731},
  {longitude: 172.998198, latitude: -43.069853},
  {longitude: 172.816907, latitude: -43.133258},
  {longitude: 172.733695, latitude: -43.255036},
  {longitude: 172.708819, latitude: -43.353207},
  {longitude: 172.722559, latitude: -43.480136},
  {longitude: 172.756367, latitude: -43.561432},
  {longitude: 172.826885, latitude: -43.604258},
  {longitude: 173.025459, latitude: -43.652028},
  {longitude: 173.102134, latitude: -43.695674},
  {longitude: 173.130086, latitude: -43.762755},
  {longitude: 173.10051, latitude: -43.831813},
  {longitude: 172.997729, latitude: -43.887374},
  {longitude: 172.930418, latitude: -43.90166},
  {longitude: 172.836627, latitude: -43.88976},
  {longitude: 172.748135, latitude: -43.854547},
  {longitude: 172.72852, latitude: -43.827673},
  {longitude: 172.587603, latitude: -43.833265},
  {longitude: 172.316619, latitude: -43.867088},
  {longitude: 172.028047, latitude: -43.958316},
  {longitude: 171.61483, latitude: -44.131829},
  {longitude: 171.506753, latitude: -44.189368},
  {longitude: 171.484468, latitude: -44.111579},
  {longitude: 171.423521, latitude: -44.062098},
  {longitude: 171.320774, latitude: -44.000262},
  {longitude: 171.275123, latitude: -43.912245},
  {longitude: 171.238846, latitude: -43.767724},
  {longitude: 171.176163, latitude: -43.732898},
  {longitude: 171.025538, latitude: -43.699262},
  {longitude: 170.966761, latitude: -43.667377},
  {longitude: 170.854004, latitude: -43.531941},
  {longitude: 170.756803, latitude: -43.508627},
  {longitude: 170.704494, latitude: -43.460976},
  {longitude: 170.640663, latitude: -43.464118},
  {longitude: 170.615575, latitude: -43.431521},
  {longitude: 170.64581, latitude: -43.370529},
  {longitude: 170.705699, latitude: -43.320787},
  {longitude: 170.761984, latitude: -43.317573},
  {longitude: 170.830348, latitude: -43.283511},
  {longitude: 170.928733, latitude: -43.206535},
  {longitude: 170.993271, latitude: -43.215314},
  {longitude: 171.079331, latitude: -43.102301},
  {longitude: 171.197689, latitude: -43.074257},
  {longitude: 171.239866, latitude: -43.03287},
  {longitude: 171.237669, latitude: -43.002511},
  {longitude: 171.316265, latitude: -42.947496},
  {longitude: 171.41163, latitude: -42.950759},
  {longitude: 171.449227, latitude: -42.909228},
  {longitude: 171.517583, latitude: -42.914098},
  {longitude: 171.590385, latitude: -42.895629},
  {longitude: 171.69067, latitude: -42.900827},
  {longitude: 171.74637, latitude: -42.874081},
  {longitude: 171.763849, latitude: -42.791722},
  {longitude: 171.841774, latitude: -42.774556},
  {longitude: 171.883945, latitude: -42.738445},
  {longitude: 171.915639, latitude: -42.68173},
  {longitude: 171.974953, latitude: -42.638993},
  {longitude: 172.094375, latitude: -42.620448},
  {longitude: 172.133001, latitude: -42.555206},
  {longitude: 172.235514, latitude: -42.456727},
  {longitude: 172.293406, latitude: -42.440141},
  {longitude: 172.348261, latitude: -42.39139},
  {longitude: 172.444257, latitude: -42.365964},
  {longitude: 172.479031, latitude: -42.277029},
  {longitude: 172.559193, latitude: -42.220088},
  {longitude: 172.614713, latitude: -42.195463},
  {longitude: 172.611996, latitude: -42.157802},
  {longitude: 172.639183, latitude: -42.100795},
  {longitude: 172.721473, latitude: -42.103492},
  {longitude: 172.721548, latitude: -42.158537},
  {longitude: 172.795642, latitude: -42.179225},
  {longitude: 172.82329, latitude: -42.204707},
  {longitude: 172.842436, latitude: -42.289184},
  {longitude: 172.914145, latitude: -42.308609},
  {longitude: 172.941393, latitude: -42.377825},
  {longitude: 172.992906, latitude: -42.40385},
  {longitude: 173.035789, latitude: -42.483471},
  {longitude: 173.106251, latitude: -42.447681},
  {longitude: 173.15232, latitude: -42.449603},
  {longitude: 173.189896, latitude: -42.410546},
  {longitude: 173.244525, latitude: -42.303104},
  {longitude: 173.312201, latitude: -42.250382},
  {longitude: 173.464463, latitude: -42.195674},
  {longitude: 173.48481, latitude: -42.17856},
  {longitude: 173.466949, latitude: -42.125096},
  {longitude: 173.499107, latitude: -42.078737},
  {longitude: 173.72021, latitude: -41.960771},
  {longitude: 173.74438, latitude: -41.907383},
  {longitude: 173.789409, latitude: -41.958198},
  {longitude: 173.817254, latitude: -41.932997},
  {longitude: 173.944307, latitude: -41.91218},
  {longitude: 174.048787, latitude: -41.968109},
];
const southCanterburyGeoCoordinates = [
  {longitude: 170.615575, latitude: -43.431521},
  {longitude: 170.640663, latitude: -43.464118},
  {longitude: 170.704494, latitude: -43.460976},
  {longitude: 170.756803, latitude: -43.508627},
  {longitude: 170.854004, latitude: -43.531941},
  {longitude: 170.966761, latitude: -43.667377},
  {longitude: 171.025538, latitude: -43.699262},
  {longitude: 171.176163, latitude: -43.732898},
  {longitude: 171.238846, latitude: -43.767724},
  {longitude: 171.275123, latitude: -43.912245},
  {longitude: 171.320774, latitude: -44.000262},
  {longitude: 171.423521, latitude: -44.062098},
  {longitude: 171.484468, latitude: -44.111579},
  {longitude: 171.506753, latitude: -44.189368},
  {longitude: 171.418656, latitude: -44.23543},
  {longitude: 171.333436, latitude: -44.295191},
  {longitude: 171.244871, latitude: -44.381717},
  {longitude: 171.258241, latitude: -44.445706},
  {longitude: 171.195791, latitude: -44.526752},
  {longitude: 171.159185, latitude: -44.627835},
  {longitude: 171.172382, latitude: -44.769838},
  {longitude: 171.167954, latitude: -44.876173},
  {longitude: 171.144154, latitude: -44.940399},
  {longitude: 170.999357, latitude: -44.921024},
  {longitude: 170.826945, latitude: -44.883543},
  {longitude: 170.579917, latitude: -44.813174},
  {longitude: 170.480355, latitude: -44.735718},
  {longitude: 170.453468, latitude: -44.701575},
  {longitude: 170.274406, latitude: -44.612235},
  {longitude: 170.190872, latitude: -44.587738},
  {longitude: 170.208775, latitude: -44.551794},
  {longitude: 170.197166, latitude: -44.495066},
  {longitude: 170.223088, latitude: -44.418319},
  {longitude: 170.203491, latitude: -44.349745},
  {longitude: 170.135615, latitude: -44.303015},
  {longitude: 169.998412, latitude: -44.261239},
  {longitude: 169.955844, latitude: -44.284776},
  {longitude: 169.877769, latitude: -44.256912},
  {longitude: 169.877115, latitude: -44.19032},
  {longitude: 169.843018, latitude: -44.152812},
  {longitude: 169.873994, latitude: -44.100929},
  {longitude: 169.816258, latitude: -44.028759},
  {longitude: 169.826973, latitude: -43.95953},
  {longitude: 169.894953, latitude: -43.879822},
  {longitude: 169.919248, latitude: -43.824741},
  {longitude: 169.963938, latitude: -43.791583},
  {longitude: 170.029438, latitude: -43.724524},
  {longitude: 170.028115, latitude: -43.691237},
  {longitude: 170.091408, latitude: -43.660373},
  {longitude: 170.098131, latitude: -43.595479},
  {longitude: 170.182698, latitude: -43.561281},
  {longitude: 170.238421, latitude: -43.513827},
  {longitude: 170.322861, latitude: -43.490349},
  {longitude: 170.395292, latitude: -43.498051},
  {longitude: 170.475363, latitude: -43.43311},
  {longitude: 170.528962, latitude: -43.410302},
  {longitude: 170.615575, latitude: -43.431521},
];
const southernPart1GeoCoordinates = [
  {longitude: 167.869697, latitude: -46.684231},
  {longitude: 167.976548, latitude: -46.723761},
  {longitude: 168.001211, latitude: -46.785763},
  {longitude: 168.071814, latitude: -46.824687},
  {longitude: 168.084121, latitude: -46.855495},
  {longitude: 168.141792, latitude: -46.861859},
  {longitude: 168.141009, latitude: -46.909408},
  {longitude: 168.031908, latitude: -46.896887},
  {longitude: 168.034423, latitude: -46.946119},
  {longitude: 168.098869, latitude: -46.960327},
  {longitude: 168.125085, latitude: -46.992739},
  {longitude: 168.177856, latitude: -46.974057},
  {longitude: 168.214669, latitude: -46.994434},
  {longitude: 168.208162, latitude: -47.04684},
  {longitude: 168.170873, latitude: -47.060097},
  {longitude: 168.156391, latitude: -47.104144},
  {longitude: 168.072331, latitude: -47.108329},
  {longitude: 168.043342, latitude: -47.12866},
  {longitude: 167.94929, latitude: -47.128552},
  {longitude: 167.897309, latitude: -47.168438},
  {longitude: 167.8257, latitude: -47.19138},
  {longitude: 167.710747, latitude: -47.160457},
  {longitude: 167.636122, latitude: -47.21029},
  {longitude: 167.646032, latitude: -47.263722},
  {longitude: 167.535354, latitude: -47.287057},
  {longitude: 167.466622, latitude: -47.282852},
  {longitude: 167.466427, latitude: -47.216517},
  {longitude: 167.575995, latitude: -47.166243},
  {longitude: 167.579122, latitude: -47.085339},
  {longitude: 167.649751, latitude: -47.036465},
  {longitude: 167.704739, latitude: -47.049428},
  {longitude: 167.69404, latitude: -46.967083},
  {longitude: 167.759027, latitude: -46.937085},
  {longitude: 167.756471, latitude: -46.860982},
  {longitude: 167.704122, latitude: -46.754442},
  {longitude: 167.754641, latitude: -46.694685},
  {longitude: 167.869697, latitude: -46.684231},
];
const southernPart2GeoCoordinates = [
  {longitude: 169.963938, latitude: -43.791583},
  {longitude: 169.919248, latitude: -43.824741},
  {longitude: 169.894953, latitude: -43.879822},
  {longitude: 169.826973, latitude: -43.95953},
  {longitude: 169.816258, latitude: -44.028759},
  {longitude: 169.873994, latitude: -44.100929},
  {longitude: 169.843018, latitude: -44.152812},
  {longitude: 169.877115, latitude: -44.19032},
  {longitude: 169.877769, latitude: -44.256912},
  {longitude: 169.955844, latitude: -44.284776},
  {longitude: 169.998412, latitude: -44.261239},
  {longitude: 170.135615, latitude: -44.303015},
  {longitude: 170.203491, latitude: -44.349745},
  {longitude: 170.223088, latitude: -44.418319},
  {longitude: 170.197166, latitude: -44.495066},
  {longitude: 170.208775, latitude: -44.551794},
  {longitude: 170.190872, latitude: -44.587738},
  {longitude: 170.274406, latitude: -44.612235},
  {longitude: 170.453468, latitude: -44.701575},
  {longitude: 170.480355, latitude: -44.735718},
  {longitude: 170.579917, latitude: -44.813174},
  {longitude: 170.826945, latitude: -44.883543},
  {longitude: 170.999357, latitude: -44.921024},
  {longitude: 171.144154, latitude: -44.940399},
  {longitude: 171.100528, latitude: -45.003008},
  {longitude: 170.98045, latitude: -45.091463},
  {longitude: 170.976029, latitude: -45.125798},
  {longitude: 170.904457, latitude: -45.174416},
  {longitude: 170.831473, latitude: -45.30556},
  {longitude: 170.828161, latitude: -45.34975},
  {longitude: 170.867561, latitude: -45.388487},
  {longitude: 170.818836, latitude: -45.423152},
  {longitude: 170.831146, latitude: -45.473512},
  {longitude: 170.754533, latitude: -45.534173},
  {longitude: 170.725244, latitude: -45.595949},
  {longitude: 170.660726, latitude: -45.630167},
  {longitude: 170.598541, latitude: -45.732913},
  {longitude: 170.741295, latitude: -45.779512},
  {longitude: 170.733285, latitude: -45.847127},
  {longitude: 170.663785, latitude: -45.903509},
  {longitude: 170.511765, latitude: -45.909171},
  {longitude: 170.342011, latitude: -45.942745},
  {longitude: 170.297527, latitude: -45.962393},
  {longitude: 170.199339, latitude: -46.055523},
  {longitude: 170.196574, latitude: -46.105711},
  {longitude: 170.168561, latitude: -46.154542},
  {longitude: 170.003596, latitude: -46.2426},
  {longitude: 169.923942, latitude: -46.298354},
  {longitude: 169.798088, latitude: -46.354698},
  {longitude: 169.780999, latitude: -46.397058},
  {longitude: 169.797052, latitude: -46.451354},
  {longitude: 169.724219, latitude: -46.478808},
  {longitude: 169.698855, latitude: -46.519339},
  {longitude: 169.616927, latitude: -46.540285},
  {longitude: 169.587587, latitude: -46.565745},
  {longitude: 169.477118, latitude: -46.561308},
  {longitude: 169.404843, latitude: -46.612326},
  {longitude: 169.279416, latitude: -46.622},
  {longitude: 169.220366, latitude: -46.656223},
  {longitude: 169.143971, latitude: -46.650301},
  {longitude: 169.005878, latitude: -46.674339},
  {longitude: 168.943565, latitude: -46.657979},
  {longitude: 168.847241, latitude: -46.65862},
  {longitude: 168.832582, latitude: -46.611179},
  {longitude: 168.793966, latitude: -46.581126},
  {longitude: 168.663155, latitude: -46.571655},
  {longitude: 168.493052, latitude: -46.610196},
  {longitude: 168.380489, latitude: -46.594939},
  {longitude: 168.31622, latitude: -46.61795},
  {longitude: 168.22554, latitude: -46.515988},
  {longitude: 168.249706, latitude: -46.474668},
  {longitude: 168.190226, latitude: -46.385363},
  {longitude: 168.142132, latitude: -46.353542},
  {longitude: 168.064941, latitude: -46.339298},
  {longitude: 168.022417, latitude: -46.357079},
  {longitude: 167.831082, latitude: -46.368087},
  {longitude: 167.783893, latitude: -46.389079},
  {longitude: 167.690912, latitude: -46.328744},
  {longitude: 167.729906, latitude: -46.298772},
  {longitude: 167.712351, latitude: -46.257696},
  {longitude: 167.611463, latitude: -46.191423},
  {longitude: 167.533283, latitude: -46.162409},
  {longitude: 167.4031, latitude: -46.152075},
  {longitude: 167.355584, latitude: -46.192008},
  {longitude: 167.341855, latitude: -46.250262},
  {longitude: 167.257448, latitude: -46.246694},
  {longitude: 167.217214, latitude: -46.262506},
  {longitude: 167.105669, latitude: -46.253661},
  {longitude: 167.018591, latitude: -46.227217},
  {longitude: 166.982054, latitude: -46.23147},
  {longitude: 166.852483, latitude: -46.208479},
  {longitude: 166.77867, latitude: -46.222072},
  {longitude: 166.657468, latitude: -46.202287},
  {longitude: 166.603031, latitude: -46.112164},
  {longitude: 166.510762, latitude: -46.053697},
  {longitude: 166.449261, latitude: -45.982572},
  {longitude: 166.426303, latitude: -45.904451},
  {longitude: 166.450291, latitude: -45.817152},
  {longitude: 166.450559, latitude: -45.719178},
  {longitude: 166.536804, latitude: -45.634371},
  {longitude: 166.669442, latitude: -45.557958},
  {longitude: 166.77766, latitude: -45.348457},
  {longitude: 166.899877, latitude: -45.199797},
  {longitude: 166.955455, latitude: -45.147559},
  {longitude: 167.002267, latitude: -45.125554},
  {longitude: 167.271322, latitude: -44.87048},
  {longitude: 167.520094, latitude: -44.733409},
  {longitude: 167.565287, latitude: -44.685032},
  {longitude: 167.774695, latitude: -44.575143},
  {longitude: 167.817171, latitude: -44.599065},
  {longitude: 167.827907, latitude: -44.507559},
  {longitude: 167.872685, latitude: -44.434274},
  {longitude: 167.931061, latitude: -44.390385},
  {longitude: 167.9871, latitude: -44.377875},
  {longitude: 167.997076, latitude: -44.329177},
  {longitude: 168.097524, latitude: -44.327164},
  {longitude: 168.117781, latitude: -44.288734},
  {longitude: 168.05208, latitude: -44.258648},
  {longitude: 168.131929, latitude: -44.281194},
  {longitude: 168.224959, latitude: -44.256824},
  {longitude: 168.347349, latitude: -44.284238},
  {longitude: 168.349075, latitude: -44.330482},
  {longitude: 168.407364, latitude: -44.375115},
  {longitude: 168.366239, latitude: -44.418918},
  {longitude: 168.333783, latitude: -44.488389},
  {longitude: 168.460042, latitude: -44.495335},
  {longitude: 168.506806, latitude: -44.466815},
  {longitude: 168.625503, latitude: -44.433935},
  {longitude: 168.687141, latitude: -44.391848},
  {longitude: 168.728392, latitude: -44.419478},
  {longitude: 168.836084, latitude: -44.339918},
  {longitude: 168.849166, latitude: -44.246672},
  {longitude: 168.877231, latitude: -44.222841},
  {longitude: 168.963356, latitude: -44.199936},
  {longitude: 168.975078, latitude: -44.144029},
  {longitude: 169.07897, latitude: -44.098363},
  {longitude: 169.147102, latitude: -44.080217},
  {longitude: 169.188798, latitude: -44.110547},
  {longitude: 169.275179, latitude: -44.098581},
  {longitude: 169.320705, latitude: -44.063797},
  {longitude: 169.372957, latitude: -44.116991},
  {longitude: 169.511997, latitude: -44.057813},
  {longitude: 169.591376, latitude: -44.012536},
  {longitude: 169.592781, latitude: -43.958076},
  {longitude: 169.698531, latitude: -43.963324},
  {longitude: 169.758299, latitude: -43.933671},
  {longitude: 169.771156, latitude: -43.899165},
  {longitude: 169.837905, latitude: -43.866631},
  {longitude: 169.867395, latitude: -43.832166},
  {longitude: 169.963938, latitude: -43.791583},
];
