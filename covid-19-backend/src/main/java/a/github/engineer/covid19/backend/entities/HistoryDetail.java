package a.github.engineer.covid19.backend.entities;

public class HistoryDetail {
    private int total;
    private int active;
    private int recovered;
    private int deaths;

    public HistoryDetail() {
    }

    public HistoryDetail(int total, int active, int recovered, int deaths) {
        this.total = total;
        this.active = active;
        this.recovered = recovered;
        this.deaths = deaths;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
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
}
