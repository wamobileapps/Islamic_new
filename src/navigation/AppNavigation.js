import React, { useState } from "react";

import Splash  from "../screen/SplashScreen";
import Login from '../../src/screen/LoginScreen';
import Signup from '../screen/Signup'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreatePin from '../screen/CreatePin';
import ForgotPassword from '../screen/ForgotPassword';
import ForgotPin from '../screen/ForgotPIn'
import ChangePassword from "../screen/ChangePassword";
import ChangePin from '../screen/ChangePin';
import PinLogin from '../screen/PinLogin';
import Reset from "../screen/ResetPassword";
import Home from "../screen/HomeScreen";
import Logo from "../screen/LogoScreen";
import Drawer from './DrawerNavigation';
import BottomTabs from './BottomNavigation';
import UserProfile from '../screen/UserProfile';
import AddJournal from '../screen/AddJournal';
import BookDetail from "../screen/BookDetails";
import AddBioGRaphy from '../screen/AddBioGraphy';
import BookChapter from '../screen/BooksChapter';
import Help from '../screen/Help';
import ContactUs from '../screen/ContactUs';
import Feedback from "../screen/Feedback";
import EditJournal from "../screen/EditJournal";
import ServiceStatus from '../screen/ServiceStatus';
import Tazkia from '../screen/Tazkia';
import TazkiaDetails from '../screen/TazkiaDetails';
import TVScreen from '../screen/TvScreen';
import TVDetail from '../screen/TVDetail';
import News from '../screen/News';
import DailyIbadh from '../screen/DailyIbadh';
import Muhasabah from '../screen/Muhasabah';
import General from '../screen/General';
import Nafz from '../screen/Nafz';
import Goal from '../screen/Goal'
import Setgoals from '../screen/Setgoels';
import SetIncome from '../screen/SetIncome'
import MyLifePlan from '../screen/MyLifePlan';
import AddHourLife from '../screen/AddHourLife';
import MyLifePlanGraph from '../screen/MyLifePlanGraph';
import SetHoursLife from '../screen/SetHoursLife';
import Self from '../screen/SelfPsycology';
import Tree from '../screen/MyTree';
import MyMoodGraph from '../screen/MyModdGraph';
import Setting from "../screen/Setting";
import PrayerSetting from '../screen/PrayerSeting';
import ManuallyTime from '../screen/ManaulyTime';
import Sp from '../screen/sp'

const Stack = createStackNavigator();


const AppNavigation = () => {



  return (
    <NavigationContainer>
      <Stack.Navigator mode="modal" screenOptions={{
        headerShown: false,
      }} >
        <Stack.Screen name="Splash" component={Sp} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Login" component={Login} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ gestureEnabled: false }} />
        <Stack.Screen name="CreatePin" component={CreatePin} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ForgotPin" component={ForgotPin} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ gestureEnabled: false }} />
        <Stack.Screen name="ChangePin" component={ChangePin} options={{ gestureEnabled: false }} />
        <Stack.Screen name="PinLogin" component={PinLogin} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Reset" component={Reset} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Logo" component={Logo} options={{ gestureEnabled: false }} />
        <Stack.Screen name="Drawer" component={Drawer} options={{gestureEnabled: false}} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} options={{gestureEnabled: false}} />
        <Stack.Screen name="UserProfile" component={UserProfile} options={{gestureEnabled: false}} />
        <Stack.Screen name="AddJournal" component={AddJournal} options={{gestureEnabled: false}} />
        <Stack.Screen name="BookDetail" component={BookDetail} options={{gestureEnabled: false}} />
        <Stack.Screen name="AddBioGRaphy" component={AddBioGRaphy} options={{gestureEnabled: false}} />
        <Stack.Screen name="BookChapter" component={BookChapter} options={{gestureEnabled: false}} />
        <Stack.Screen name="Help" component={Help} options={{gestureEnabled: false}} />
        <Stack.Screen name="ContactUs" component={ContactUs} options={{gestureEnabled: false}} />
        <Stack.Screen name="Feedback" component={Feedback} options={{gestureEnabled: false}} />
        <Stack.Screen name="EditJournal" component={EditJournal} options={{gestureEnabled: false}} />
        <Stack.Screen name="ServiceStatus" component={ServiceStatus} options={{gestureEnabled: false}} />
        <Stack.Screen name="Tazkia" component={Tazkia} options={{gestureEnabled: false}} />
        <Stack.Screen name="TazkiaDetails" component={TazkiaDetails} options={{gestureEnabled: false}} />
        <Stack.Screen name="TVScreen" component={TVScreen} options={{gestureEnabled: false}} />
        <Stack.Screen name="TVDetail" component={TVDetail} options={{gestureEnabled: false}} />
        <Stack.Screen name="News" component={News} options={{gestureEnabled: false}} />
        <Stack.Screen name="DailyIbadh" component={DailyIbadh} options={{gestureEnabled: false}} />
        <Stack.Screen name="Muhasabah" component={Muhasabah} options={{gestureEnabled: false}} />
        <Stack.Screen name="General" component={General} options={{gestureEnabled: false}} />
        <Stack.Screen name="Nafz" component={Nafz} options={{gestureEnabled: false}} />
        <Stack.Screen name="Goal" component={Goal} options={{gestureEnabled: false}} />
        <Stack.Screen name="Setgoals" component={Setgoals} options={{gestureEnabled: false}} />
        <Stack.Screen name="SetIncome" component={SetIncome} options={{gestureEnabled: false}} />
        <Stack.Screen name="MyLifePlan" component={MyLifePlan} options={{gestureEnabled: false}} />
        <Stack.Screen name="AddHourLife" component={AddHourLife} options={{gestureEnabled: false}} />
        <Stack.Screen name="MyLifePlanGraph" component={MyLifePlanGraph} options={{gestureEnabled: false}} />
        <Stack.Screen name="SetHoursLife" component={SetHoursLife} options={{gestureEnabled: false}} />
        <Stack.Screen name="Self" component={Self} options={{gestureEnabled: false}} />
        <Stack.Screen name="Tree" component={Tree} options={{gestureEnabled: false}} />
        <Stack.Screen name="MyMoodGraph" component={MyMoodGraph} options={{gestureEnabled: false}} />
        <Stack.Screen name="Setting" component={Setting} options={{gestureEnabled: false}} />
        <Stack.Screen name="PrayerSetting" component={PrayerSetting} options={{gestureEnabled: false}} />
        <Stack.Screen name="ManuallyTime" component={ManuallyTime} options={{gestureEnabled: false}} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;