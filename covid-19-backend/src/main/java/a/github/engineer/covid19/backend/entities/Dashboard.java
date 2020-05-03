package a.github.engineer.covid19.backend.entities;

import com.alibaba.fastjson.JSON;

public class Dashboard {
    private String activeCases;
    private String totalCases;
    private String recoveredCases;
    private String deaths;
    private String newActiveCases;
    private String newTotalCases;
    private String newRecoveredCases;
    private String newDeaths;

    public Dashboard() {
    }

    public Dashboard(String activeCases, String totalCases, String recoveredCases, String deaths,
                     String newActiveCases, String newTotalCases, String newRecoveredCases, String newDeaths) {
        this.activeCases = activeCases;
        this.totalCases = totalCases;
        this.recoveredCases = recoveredCases;
        this.deaths = deaths;
        this.newActiveCases = newActiveCases;
        this.newTotalCases = newTotalCases;
        this.newRecoveredCases = newRecoveredCases;
        this.newDeaths = newDeaths;
    }

    public static Dashboard generateDashboard(String json) {
        return JSON.parseObject(json, Dashboard.class);
    }

    public String toJson() {
        return JSON.toJSONString(this);
    }

    public String getActiveCases() {
        return activeCases;
    }

    public void setActiveCases(String activeCases) {
        this.activeCases = activeCases;
    }

    public String getTotalCases() {
        return totalCases;
    }

    public void setTotalCases(String totalCases) {
        this.totalCases = totalCases;
    }

    public String getRecoveredCases() {
        return recoveredCases;
    }

    public void setRecoveredCases(String recoveredCases) {
        this.recoveredCases = recoveredCases;
    }

    public String getDeaths() {
        return deaths;
    }

    public void setDeaths(String deaths) {
        this.deaths = deaths;
    }

    public String getNewActiveCases() {
        return newActiveCases;
    }

    public void setNewActiveCases(String newActiveCases) {
        this.newActiveCases = newActiveCases;
    }

    public String getNewTotalCases() {
        return newTotalCases;
    }

    public void setNewTotalCases(String newTotalCases) {
        this.newTotalCases = newTotalCases;
    }

    public String getNewRecoveredCases() {
        return newRecoveredCases;
    }

    public void setNewRecoveredCases(String newRecoveredCases) {
        this.newRecoveredCases = newRecoveredCases;
    }

    public String getNewDeaths() {
        return newDeaths;
    }

    public void setNewDeaths(String newDeaths) {
        this.newDeaths = newDeaths;
    }
}
