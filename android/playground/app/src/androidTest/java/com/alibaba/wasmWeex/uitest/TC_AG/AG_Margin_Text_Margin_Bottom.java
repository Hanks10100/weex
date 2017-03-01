package com.alibaba.wasmWeex.uitest.TC_AG;
import com.alibaba.wasmWeex.WXPageActivity;
import com.alibaba.wasmWeex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Margin_Text_Margin_Bottom extends TestFlow {
	public AG_Margin_Text_Margin_Bottom() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Margin");
		testMap.put("testChildCaseInit", "AG_Margin_Text_Margin_Bottom");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "10");
				put("screenshot", "AG_Margin_Text_Margin_Bottom_01_10");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "20");
				put("screenshot", "AG_Margin_Text_Margin_Bottom_02_20");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
