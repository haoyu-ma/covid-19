package a.github.engineer.covid19.backend.entities;

import java.util.List;

public class Location {
    private String name;
    private int totalCases;
    private int newCases;
    private int active;
    private int recovered;
    private int deaths;
    private int inHospital;
    private List<Integer> activeTrend;

    public Location() {
    }

    public Location(String name, int totalCases, int newCases, int active,
                    int recovered, int deaths, int inHospital) {
        this.name = name;
        this.totalCases = totalCases;
        this.newCases = newCases;
        this.active = active;
        this.recovered = recovered;
        this.deaths = deaths;
        this.inHospital = inHospital;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getTotalCases() {
        return totalCases;
    }

    public void setTotalCases(int totalCases) {
        this.totalCases = totalCases;
    }

    public int getNewCases() {
        return newCases;
    }

    public void setNewCases(int newCases) {
        this.newCases = newCases;
    }

    public int getActive() {
        return active;
    }

    public void setActive(int active) {
        this.active = active;
    }

    public int getRecovered() {
        return recovered;
    }

    public void setRecovered(int recovered) {
        this.recovered = recovered;
    }

    public int getDeaths() {
        return deaths;
    }

    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }

    public int getInHospital() {
        return inHospital;
    }

    public void setInHospital(int inHospital) {
        this.inHospital = inHospital;
    }

    public List<Integer> getActiveTrend() {
        return activeTrend;
    }

    public void setActiveTrend(List<Integer> activeTrend) {
        this.activeTrend = activeTrend;
    }
}
