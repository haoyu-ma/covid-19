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
    private List<Integer> totalTrend;
    private List<Integer> recoveredTrend;
    private List<Integer> deathsTrend;
    private List<Integer> newTrend;
    private List<RegionAgesGenders> agesGenders;

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

    public List<Integer> getNewTrend() {
        return newTrend;
    }

    public void setNewTrend(List<Integer> newTrend) {
        this.newTrend = newTrend;
    }

    public List<Integer> getTotalTrend() {
        return totalTrend;
    }

    public void setTotalTrend(List<Integer> totalTrend) {
        this.totalTrend = totalTrend;
    }

    public List<Integer> getRecoveredTrend() {
        return recoveredTrend;
    }

    public void setRecoveredTrend(List<Integer> recoveredTrend) {
        this.recoveredTrend = recoveredTrend;
    }

    public List<Integer> getDeathsTrend() {
        return deathsTrend;
    }

    public void setDeathsTrend(List<Integer> deathsTrend) {
        this.deathsTrend = deathsTrend;
    }

    public List<RegionAgesGenders> getAgesGenders() {
        return agesGenders;
    }

    public void setAgesGenders(List<RegionAgesGenders> agesGenders) {
        this.agesGenders = agesGenders;
    }
}
