package a.github.engineer.covid19.backend.entities;

public class SummaryData {
    private int activeCases;
    private int combinedCases;
    private int recoveredCases;
    private int deaths;
    private int combinedCasesNew;
    private int recoveredCasesNew;
    private int deathsNew;

    public SummaryData() {
    }

    public SummaryData(int combinedCases, int recoveredCases, int deaths, int combinedCasesNew, int recoveredCasesNew, int deathsNew) {
        this.activeCases = combinedCases - recoveredCases;
        this.combinedCases = combinedCases;
        this.recoveredCases = recoveredCases;
        this.deaths = deaths;
        this.combinedCasesNew = combinedCasesNew;
        this.recoveredCasesNew = recoveredCasesNew;
        this.deathsNew = deathsNew;
    }

    public int getActiveCases() {
        return activeCases;
    }

    public void setActiveCases(int activeCases) {
        this.activeCases = activeCases;
    }

    public int getCombinedCases() {
        return combinedCases;
    }

    public void setCombinedCases(int combinedCases) {
        this.combinedCases = combinedCases;
    }

    public int getRecoveredCases() {
        return recoveredCases;
    }

    public void setRecoveredCases(int recoveredCases) {
        this.recoveredCases = recoveredCases;
    }

    public int getDeaths() {
        return deaths;
    }

    public void setDeaths(int deaths) {
        this.deaths = deaths;
    }

    public int getCombinedCasesNew() {
        return combinedCasesNew;
    }

    public void setCombinedCasesNew(int combinedCasesNew) {
        this.combinedCasesNew = combinedCasesNew;
    }

    public int getRecoveredCasesNew() {
        return recoveredCasesNew;
    }

    public void setRecoveredCasesNew(int recoveredCasesNew) {
        this.recoveredCasesNew = recoveredCasesNew;
    }

    public int getDeathsNew() {
        return deathsNew;
    }

    public void setDeathsNew(int deathsNew) {
        this.deathsNew = deathsNew;
    }
}
