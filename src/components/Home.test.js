import React from 'react';
import Home from './Home';
import {shallow, configure} from "enzyme"
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()})

test("should have one child", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find("div").children()).toHaveLength(1)
})

test("should render the profile content", () => {
    const wrapper  = shallow(<Home />); 
    expect(wrapper.find('.profile_content').text()).toBe("Welcome to your profile")
})