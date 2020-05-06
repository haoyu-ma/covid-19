package a.github.engineer.covid19.backend.entities;

import com.alibaba.fastjson.JSON;

import java.util.Date;

public class Summary {
    private Date date;
    private int combinedTotal;
    private int confirmedTotal;
    private int probableTotal;
    private int combined;
    private int confirmed;
    private int probable;
    private int hospital;
    private int hospitalTotal;
    private int recovered;
    private int recoveredTotal;
    private int deaths;
    private int deathsTotal;

    public Summary() {
    }

    public Summary(Date date, int combinedTotal, int confirmedTotal, int probableTotal, int combined,
                        int confirmed, int probable, int hospital, int hospitalTotal, int recovered,
                        int recoveredTotal, int deaths, int deathsTotal) {
        this.date = date;
        this.combinedTotal = combinedTotal;
        this.confirmedTotal = confirmedTotal;
        this.probableTotal = probableTotal;
        this.combined = combined;
        this.confirmed = confirmed;
        this.probable = probable;
        this.hospital = hospital;
        this.hospitalTotal = hospitalTotal;
        this.recovered = recovered;
        this.recoveredTotal = recoveredTotal;
        this.deaths = deaths;
        this.deathsTotal = deathsTotal;
    }

    public static Summary generateSummary(String json) {
        return JSON.parseObject(json, Summary.class);
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public int getCombinedTotal() {
        return combinedTotal;
    }

    public void setCombinedTotal(int combinedTotal) {
        this.combinedTotal = combinedTotal;
    }

    public int getConfirmedTotal() {
        return confirmedTotal;
    }

    public void setConfirmedTotal(int confirmedTotal) {
        this.confirmedTotal = confirmedTotal;
    }

    public int getProbableTotal() {
        return probableTotal;
    }

    public void setProbableTotal(int probableTotal) {
        this.probableTotal = probableTotal;
    }

    public int getCombined() {
        return combined;
    }

    public void setCombined(int combined) {
        this.combined = combined;
    }

    public int getConfirmed() {
        return confirmed;
    }

    public void setConfirmed(int confirmed) {
        this.confirmed = confirmed;
    }

    public int getProbable() {
        return probable;
    }

    public void setProbable(int probable) {
        this.probable = probable;
    }

    public int getHospital() {
        return hospital;
    }

    public void setHospital(int hospital) {
        this.hospital = hospital;
    }

    public int getHospitalTotal() {
        return hospitalTotal;
    }

    public void setHospitalTotal(int hospitalTotal) {
        this.hospitalTotal = hospitalTotal;
    }

    public int getRecovered() {
        return recovered;
    }

    public void setRecovered(int recovered) {
        this.recovered = recovered;
    }

    public int getRecoveredTotal() {
        return recoveredTotal;
    }

    public void setRecoveredTotal(int recoveredTotal) {
        this.recoveredTotal = recoveredTotal;
    }

    public int getDeaths() {
        return deaths;
    }

    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }

    public int getDeathsTotal() {
        return deathsTotal;
    }

    public void setDeathsTotal(int deathsTotal) {
        this.deathsTotal = deathsTotal;
    }
}
