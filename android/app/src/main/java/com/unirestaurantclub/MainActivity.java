package com.unirestaurantclub;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);

        //Initializes the bridge
        this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
        //Additional Plugins you've installed go here
        // Ex: add(TotallyAwsomePlugin.class);
        add(GoogleAuth.class);    
         }});
    }
}
