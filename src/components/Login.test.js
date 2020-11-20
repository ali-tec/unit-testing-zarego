import Adapter from 'enzyme-adapter-react-16';
import {configure, shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Login from './Login';
import getUser from './GetUsers';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


const someData = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
          "street": "Kulas Light",
          "suite": "Apt. 556",
          "city": "Gwenborough",
          "zipcode": "92998-3874",
          "geo": {
            "lat": "-37.3159",
            "lng": "81.1496"
          }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
          "name": "Romaguera-Crona",
          "catchPhrase": "Multi-layered client-server neural-net",
          "bs": "harness real-time e-markets"
        }
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
          "street": "Victor Plains",
          "suite": "Suite 879",
          "city": "Wisokyburgh",
          "zipcode": "90566-7771",
          "geo": {
            "lat": "-43.9509",
            "lng": "-34.4618"
          }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
          "name": "Deckow-Crist",
          "catchPhrase": "Proactive didactic contingency",
          "bs": "synergize scalable supply-chains"
        }
      },
]

configure({adapter: new Adapter()});

afterEach(() => {
    // clears the state of every mock object
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.mock('axios', () => {
        return {
          __esModule: true,
          default: jest.fn()
        }
      });
  })


//   replaces the localstorage lo que esta en el window (global en node) 
//   con esta mock
class LocalStorageMock {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = value.toString();
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  };
  
  global.localStorage = new LocalStorageMock;

test("button should have text of /Login/", () => {
    // renders the component of login
    const wrapper = shallow(<Login  />);
    // finds all the button tags
    expect(wrapper.find("button").text()).toBe("Login");
})

test("should have two input fields", () => {
    const wrapper = shallow(<Login />);
    // we can also use input find method on classes, ids or anytype of texts 
    // to mark the element
    expect(wrapper.find("input")).toHaveLength(2);
    console.log(wrapper.find("input"))
})

test("should get data from the API", () => {
    const mock = new MockAdapter(axios)
    const data = [...someData];
    mock.onGet('https://jsonplaceholder.typicode.com/users').reply(200, data);
    getUser()
    .then((res) => {
        expect(res).toEqual(someData)
    })
})

test('should set a token in localStorage onSubmit event', () => {
    const fakeEvent = { preventDefault: () => console.log('preventDefault') };
    const wrapper = shallow(<Login />);
    // makes sure that form-login is rendering
    expect(wrapper.find('.form-login').length).toBe(1);
    // simulate 
    wrapper.find('.form-login').simulate('submit', fakeEvent);
    localStorage.setItem("logged", "yes");
    expect(localStorage.getItem("logged")).toBe("yes");
});


test("should match the snapshot", () => {
    const wrapper = shallow(<Login />);
    expect(toJson(wrapper)).toMatchSnapshot();
})
