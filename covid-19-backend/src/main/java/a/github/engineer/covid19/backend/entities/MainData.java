package a.github.engineer.covid19.backend.entities;

import java.util.List;
import java.util.Map;

public class MainData {
    private List<Location> locations;
    private SummaryData summaryData;
    private List<Summary> summary;
    private Map<String, List<HistoryDetail>> history;
    private Map<String, List<RegionAgesGenders>> regionAgesGenders;

    public MainData() {
    }

    public MainData(List<Location> locations, SummaryData summaryData, List<Summary> summary,
                    Map<String, List<HistoryDetail>> history, Map<String, List<RegionAgesGenders>> regionAgesGenders) {
        this.locations = locations;
        this.summaryData = summaryData;
        this.summary = summary;
        this.history = history;
        this.regionAgesGenders = regionAgesGenders;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }

    public SummaryData getSummaryData() {
        return summaryData;
    }

    public void setSummaryData(SummaryData summaryData) {
        this.summaryData = summaryData;
    }

    public List<Summary> getSummary() {
        return summary;
    }

    public void setSummary(List<Summary> summary) {
        this.summary = summary;
    }

    public Map<String, List<HistoryDetail>> getHistory() {
        return history;
    }

    public void setHistory(Map<String, List<HistoryDetail>> history) {
        this.history = history;
    }

    public Map<String, List<RegionAgesGenders>> getRegionAgesGenders() {
        return regionAgesGenders;
    }

    public void setRegionAgesGenders(Map<String, List<RegionAgesGenders>> regionAgesGenders) {
        this.regionAgesGenders = regionAgesGenders;
    }
}
