package com.alibaba.wasmWeex.uitest.TC_AG;
import com.alibaba.wasmWeex.WXPageActivity;
import com.alibaba.wasmWeex.util.TestFlow;
import java.util.TreeMap;
import org.junit.Before;
import org.junit.Test;

public class AG_CommonAttribute_Image_If extends TestFlow {
	public AG_CommonAttribute_Image_If() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		TreeMap testMap = new <String, Object> TreeMap();
		testMap.put("testComponet", "AG_CommonAttribute");
		testMap.put("testChildCaseInit", "AG_CommonAttribute_Image_If");
		testMap.put("step1",new TreeMap(){
			{
				put("click", "true");
				put("screenshot", "AG_CommonAttribute_Image_If_01_true");
			}
		});
		testMap.put("step2",new TreeMap(){
			{
				put("click", "false");
				put("screenshot", "AG_CommonAttribute_Image_If_02_false");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
