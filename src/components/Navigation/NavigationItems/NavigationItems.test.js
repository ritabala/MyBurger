import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()}); 

describe('<NavigationITems /> bundle testing  is being done here',()=>{
    let wrapper;
    beforeEach(()=>{
         wrapper = shallow(<NavigationItems/>);
    })
    it('2 NavigationITem if element is not authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    })

    it('3 NavigationITem if element is  authenticated',()=>{
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })

    it('1 NavigationITem if element is not authenticated',()=>{
        wrapper.setProps({isAuth:true})
        expect(wrapper.contains(<NavigationItem link="/logout" exact>LogOut</NavigationItem>)).toEqual(true);
    })
})
