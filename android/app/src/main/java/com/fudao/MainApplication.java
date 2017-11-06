package com.huodong;

import android.app.Application;

import com.facebook.react.ReactApplication;
import cn.reactnative.modules.weibo.WeiboPackage;
import cn.reactnative.modules.qq.QQPackage;
import com.theweflex.react.WeChatPackage;
import com.remobile.toast.RCTToastPackage;
import com.eguma.barcodescanner.BarcodeScannerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.horcrux.svg.SvgPackage;
import com.imagepicker.ImagePickerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;
import io.realm.react.RealmReactPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new BarcodeScannerPackage(),
            new WeiboPackage(),
            new QQPackage(),
            new WeChatPackage(),
            new ReactVideoPackage(),
            new SvgPackage(),
            new ImagePickerPackage(),
            new RCTToastPackage(),
            new RealmReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
