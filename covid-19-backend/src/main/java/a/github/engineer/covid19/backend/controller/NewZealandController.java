package a.github.engineer.covid19.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public String getDashboardData() {
        return "";
    }

}
