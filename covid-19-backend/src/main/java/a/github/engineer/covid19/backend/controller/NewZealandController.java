package a.github.engineer.covid19.backend.controller;

import a.github.engineer.covid19.backend.CommonUtils;
import a.github.engineer.covid19.backend.entities.Dashboard;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Objects;

@RestController
@RequestMapping("/nz")
public class NewZealandController {

    @RequestMapping("/test")
    public String test() {
        return "this is a test!";
    }

    @RequestMapping("/active")
    public int getActiveCasesNumber() {
        return 0;
    }

    @RequestMapping("/confirmed")
    public int getConfirmedCasesNumber() {
        return 0;
    }

    @RequestMapping("/deaths")
    public int getDeathsNumber() {
        return 0;
    }

    @RequestMapping("/recovered")
    public int getRecoveredCasesNumber() {
        return 0;
    }

    @RequestMapping("/dashboard")
    public Dashboard getDashboardData() {
        String path = Objects.requireNonNull(this.getClass().getClassLoader().getResource("data/dashboard.json")).getPath();
        return Dashboard.generateDashboard(CommonUtils.readJsonFile(path));
    }

}
