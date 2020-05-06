package a.github.engineer.covid19.backend.controller;

import a.github.engineer.covid19.backend.CommonUtils;
import a.github.engineer.covid19.backend.entities.HistoryDetail;
import a.github.engineer.covid19.backend.entities.MainData;
import com.alibaba.fastjson.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/nz")
public class NewZealandController {
    @RequestMapping("/main")
    public MainData getMainData() {
        String path = Objects.requireNonNull(this.getClass().getClassLoader().getResource("data/main.json")).getPath();
        String mainJson = CommonUtils.readJsonFile(path);
        MainData mainData = JSONObject.parseObject(mainJson, MainData.class);

        assert mainData != null;
        mainData.getSummaryData().setActiveCases(mainData.getSummaryData().getCombinedCases() - mainData.getSummaryData().getRecoveredCases() - mainData.getSummaryData().getDeaths());

        Map<String, List<HistoryDetail>> history = mainData.getHistory();
        mainData.getLocations().forEach(location -> location.setActiveTrend(history.get(location.getName()).stream().filter(h -> h.getActive() != 0).map(HistoryDetail::getActive).collect(Collectors.toList())));

        return mainData;
    }
}
