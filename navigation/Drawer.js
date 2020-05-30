import { createDrawerNavigator} from 'react-navigation-drawer';
import AppNavigation from './AppNavigation';
import AboutUsNavigation from './AboutUsNavigation';
import ContactUsNavigation from './ContactUsNavigation';
import GalleryNavigation from './GalleryNavigation';
import HoursNavigation from './HoursNavigation';
import TeamNavigation from './TeamNavigation';

const RootDrawerNavigator = createDrawerNavigator({
    Home : {
        screen: AppNavigation
    },
    AboutUs:{
        screen:AboutUsNavigation
    },
    ContactUs:{
        screen:ContactUsNavigation
    },
    Gallery:{
        screen:GalleryNavigation
    },
    Team:{
        screen: TeamNavigation
    },
    Hours:{
        screen:HoursNavigation
    }
});

export default RootDrawerNavigator;
