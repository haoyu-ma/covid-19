package a.github.engineer.covid19.backend.entities;

public class RegionAgesGenders {
    private String age;
    private int female;
    private int male;

    public RegionAgesGenders(String age, int female, int male) {
        this.age = age;
        this.female = female;
        this.male = male;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public int getFemale() {
        return female;
    }

    public void setFemale(int female) {
        this.female = female;
    }

    public int getMale() {
        return male;
    }

    public void setMale(int male) {
        this.male = male;
    }
}
