package com.alibaba.wasmWeex.uitest.TC_AG;
import com.alibaba.wasmWeex.WXPageActivity;
import com.alibaba.wasmWeex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Text_Text_Font_Weight extends TestFlow {
	public AG_Text_Text_Font_Weight() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Text");
		testMap.put("testChildCaseInit", "AG_Text_Text_Font_Weight");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "normal");
				put("screenshot", "AG_Text_Text_Font_Weight_01_normal");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "bold");
				put("screenshot", "AG_Text_Text_Font_Weight_02_bold");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
