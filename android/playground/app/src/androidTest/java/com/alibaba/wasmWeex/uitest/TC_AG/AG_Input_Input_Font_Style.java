package com.alibaba.wasmWeex.uitest.TC_AG;
import com.alibaba.wasmWeex.WXPageActivity;
import com.alibaba.wasmWeex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Input_Input_Font_Style extends TestFlow {
	public AG_Input_Input_Font_Style() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_Input");
		testMap.put("testChildCaseInit", "AG_Input_Input_Font_Style");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "normal");
				put("screenshot", "AG_Input_Input_Font_Style_01_normal");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "italic");
				put("screenshot", "AG_Input_Input_Font_Style_02_italic");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
