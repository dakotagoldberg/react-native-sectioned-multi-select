import * as React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Switch,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  LayoutAnimation,
  FlatList,
  TouchableHighlightBase
} from 'react-native';
import SectionedMultiSelect, {
  useSectionedMultiSelect,
  SMSContext,
  Chip,
  Items
} from 'react-native-sectioned-multi-select/lib/sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ContextRenderFunctionExample from './components/ContextRenderFunctionExample';
import ComponentExample from './components/ComponentExample';

// Sorry for the mess

const items = [
  {
    title: 'Burgers',
    id: 2,
    icon: 'hamburger',

    children: [
      {
        title: 'Classic cheeseburger',
        description: 'A cheese-meat-bun affair.',
        id: 30
      },
      {
        title: 'Juicy Lucy',
        id: 31
      },
      {
        title: 'Avocado burger',
        id: 32
      },
      {
        title: 'BLT burger',
        id: 33
      }
    ]
  },
  {
    title: 'Drinks',
    id: 4,
    icon: 'food-fork-drink',
    children: [
      {
        title: 'Coke',
        id: 0
      },
      {
        title: 'Diet Coke',
        id: 1
      },
      {
        title: 'Fanta',
        id: 2
      },
      {
        title: 'Sprite',
        id: 3
      },
      {
        title: 'Seltzer Water',
        id: 15
      },
      {
        title: 'Iced Tea',
        id: 17
      },
      {
        title: 'Ginger Ale',
        id: 18
      },
      {
        title: 'Beer',
        id: 19
      },
      {
        title: 'Mango Lassi',
        id: 20
      }
    ]
  },
  {
    title: 'Sides',
    id: 1,
    icon: 'food',
    children: [
      {
        title: 'Fries',
        id: 26
      },
      {
        title: 'Chicken Wings',
        id: 27
      },
      {
        title: 'Haloumi chips',
        id: 28
      },
      {
        title: 'Chili fries',
        id: 29
      }
    ]
  },
  {
    title: 'Extras',
    id: 5,
    children: [
      {
        title: 'Pickles'
      },
      {
        title: 'Red Onion'
      },
      {
        title: 'Jalapenos'
      },
      {
        title: 'Hot Sauce'
      },
      {
        title: 'Cheese'
      }
    ]
  },
  {
    title: 'No child',
    id: 34,
    children: []
  }
];
console.log(items);

// const items2 =
//   [{
//     title: 'Plants',
//     id: 2,
//     children: [
//       {
//         title: "Mother In Law's Tongue",
//         id: 30,
//       },
//       {
//         title: 'Yucca',
//         id: 31,
//       },
//       {
//         title: 'Monsteria',
//         id: 32,
//       },
//       {
//         title: 'Palm',
//         id: 33,
//       },

//     ],
//   }]
const items2 = [];
for (let i = 0; i < 100; i++) {
  items2.push({
    id: i,
    title: `item ${i}`,
    children: [
      {
        id: `10${i}`,
        title: `child 10${i}`
      },
      {
        id: `11${i}`,
        title: `child 11${i}`
      },
      {
        id: `12${i}`,
        title: `child 12${i}`
      }
    ]
  });
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333'
  },
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
    marginBottom: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 20
  },
  label: {
    fontWeight: 'bold'
  },
  switch: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  }
});
const accentMap = {
  â: 'a',
  Â: 'A',
  à: 'a',
  À: 'A',
  á: 'a',
  Á: 'A',
  ã: 'a',
  Ã: 'A',
  ê: 'e',
  Ê: 'E',
  è: 'e',
  È: 'E',
  é: 'e',
  É: 'E',
  î: 'i',
  Î: 'I',
  ì: 'i',
  Ì: 'I',
  í: 'i',
  Í: 'I',
  õ: 'o',
  Õ: 'O',
  ô: 'o',
  Ô: 'O',
  ò: 'o',
  Ò: 'O',
  ó: 'o',
  Ó: 'O',
  ü: 'u',
  Ü: 'U',
  û: 'u',
  Û: 'U',
  ú: 'u',
  Ú: 'U',
  ù: 'u',
  Ù: 'U',
  ç: 'c',
  Ç: 'C'
};
const tintColor = '#174A87';

const Loading = props =>
  props.hasErrored ? (
    <TouchableWithoutFeedback onPress={props.fetchCategories}>
      <View style={styles.center}>
        <Text>oops... something went wrong. Tap to reload</Text>
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <View style={styles.center}>
      <ActivityIndicator size="large" />
    </View>
  );

const Toggle = props => (
  <TouchableWithoutFeedback
    // hitSlop={{top: 10, bottom: 10}}
    onPress={() => props.onPress(!props.val)}
    disabled={props.disabled}>
    <View style={styles.switch}>
      <Text style={styles.label}>{props.name}</Text>
      <Switch
        trackColor={tintColor}
        onValueChange={v => props.onPress(v)}
        value={props.val}
        disabled={props.disabled}
      />
    </View>
  </TouchableWithoutFeedback>
);

const customChip = ({id, text, onPress}) => (
  <View
    key={id}
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      paddingHorizontal: 8,
      paddingVertical: 4,
      backgroundColor: '#dadada',
      marginHorizontal: 4
    }}>
    <Text style={{color: 'grey', fontWeight: 'bold'}}>{text}</Text>
    <TouchableOpacity style={{marginLeft: 4}} onPress={onPress}>
      <Icon name="close" color="grey" />
    </TouchableOpacity>
  </View>
);
const customIconRenderer = ({name, size = 18, style}) => {
  // flatten the styles
  const flat = StyleSheet.flatten(style);
  // remove out the keys that aren't accepted on View
  const {color, fontSize, ...styles} = flat;

  let iconComponent;
  // the colour in the url on this site has to be a hex w/o hash
  const iconColor =
    color && color.substr(0, 1) === '#' ? `/${color.substr(1)}/` : '/';

  const Search = (
    <Image
      source={{uri: `https://png.icons8.com${iconColor}ios/search/`}}
      style={{width: size, height: size}}
    />
  );
  const Down = (
    <Image
      source={{uri: `https://png.icons8.com${iconColor}ios/down/`}}
      style={{width: size, height: size}}
    />
  );
  const Up = (
    <Image
      source={{uri: `https://png.icons8.com${iconColor}ios/up/`}}
      style={{width: size, height: size}}
    />
  );
  const Close = (
    <Image
      source={{uri: `https://png.icons8.com/${iconColor}ios/multiply/`}}
      style={{width: size, height: size}}
    />
  );

  const Check = (
    <Image
      source={{uri: `https://png.icons8.com/${iconColor}android/checkmark/`}}
      style={{width: size / 1.5, height: size / 1.5}}
    />
  );
  const Cancel = (
    <Image
      source={{uri: `https://png.icons8.com/${iconColor}ios/cancel/`}}
      style={{width: size, height: size}}
    />
  );

  switch (name) {
    case 'search':
      iconComponent = Search;
      break;
    case 'keyboard-arrow-up':
      iconComponent = Up;
      break;
    case 'keyboard-arrow-down':
      iconComponent = Down;
      break;
    case 'close':
      iconComponent = Close;
      break;
    case 'check':
      iconComponent = Check;
      break;
    case 'cancel':
      iconComponent = Cancel;
      break;
    default:
      iconComponent = null;
      break;
  }
  return <View style={styles}>{iconComponent}</View>;
};

let date = new Date();

const SMSStyles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 0
  },
  item: {
    paddingHorizontal: 20
  },
  itemWrapper: {
    borderColor: '#dadada',
    borderBottomWidth: 1
  },
  subItem: {
    paddingHorizontal: 20
  },
  subItemText: {
    fontSize: 20
  },
  parentChipText: {
    fontWeight: 'bold'
  },
  removeAllChipContainer: {
    backgroundColor: 'grey'
  },
  removeAllChipText: {
    color: 'white'
  },
  selectToggle: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'silver',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16
  },
  selectedSubItem: {
    backgroundColor: '#333'
  },
  selectedSubItemText: {
    color: '#dadada'
  },
  itemIconStyle: {
    marginRight: 6
  },
  separator: {height: 0},
  highlightedSubItem: {
    backgroundColor: 'white'
  }
});
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: null,
      loading: false,
      selectedItems: [],
      selectedItemObjects: [],
      currentItems: [],
      showDropDowns: true,
      expandDropDowns: true,
      single: false,
      readOnlyHeadings: false,
      parentsHighlightAllChildren: false,
      parentsSelectAllChildren: true,
      hideChipRemove: false,
      hasErrored: false
    };
    this.termId = 100;
    this.maxItems = 5;
  }

  componentDidMount() {
    this.pretendToLoad();
    // programatically opening the select
    // this.SectionedMultiSelect._toggleSelector()
  }
  UNSAFE_componentWillUpdate() {
    date = new Date();
  }
  componentDidUpdate() {
    // date = new Date()
    console.log(new Date().valueOf() - date.valueOf());
  }
  // custom icon renderer passed to iconRenderer prop
  // see the switch for possible icon name
  // values
  icon = ({name, size = 18, style}) => {
    // flatten the styles
    const flat = StyleSheet.flatten(style);
    // remove out the keys that aren't accepted on View
    const {color, fontSize, ...styles} = flat;

    let iconComponent;
    // the colour in the url on this site has to be a hex w/o hash
    const iconColor =
      color && color.substr(0, 1) === '#' ? `${color.substr(1)}/` : '/';

    const Search = (
      <Image
        source={{uri: `https://png.icons8.com/search/${iconColor}ios/`}}
        style={{width: size, height: size}}
      />
    );
    const Down = (
      <Image
        source={{uri: `https://png.icons8.com/down/${iconColor}ios/`}}
        style={{width: size, height: size}}
      />
    );
    const Up = (
      <Image
        source={{uri: `https://png.icons8.com/up/${iconColor}ios/`}}
        style={{width: size, height: size}}
      />
    );
    const Close = (
      <Image
        source={{uri: `https://png.icons8.com/multiply/${iconColor}ios/`}}
        style={{width: size, height: size}}
      />
    );

    const Check = (
      <Image
        source={{
          uri: `https://png.icons8.com/checkmark/${iconColor}android/`
        }}
        style={{width: size / 1.5, height: size / 1.5}}
      />
    );
    const Cancel = (
      <Image
        source={{uri: `https://png.icons8.com/cancel/${iconColor}ios/`}}
        style={{width: size, height: size}}
      />
    );

    switch (name) {
      case 'search':
        iconComponent = Search;
        break;
      case 'keyboard-arrow-up':
        iconComponent = Up;
        break;
      case 'keyboard-arrow-down':
        iconComponent = Down;
        break;
      case 'close':
        iconComponent = Close;
        break;
      case 'check':
        iconComponent = Check;
        break;
      case 'cancel':
        iconComponent = Cancel;
        break;
      default:
        iconComponent = null;
        break;
    }
    return <View style={styles}>{iconComponent}</View>;
  };

  getProp = (object, key) => object && this.removerAcentos(object[key]);

  rejectProp = (items, fn) => items.filter(fn);

  pretendToLoad = () => {
    this.setState({loading: true});
    setTimeout(() => {
      this.setState({loading: false, items});
    }, 0);
  };

  // testing a custom filtering function that ignores accents
  removerAcentos = s => s.replace(/[\W\[\] ]/g, a => accentMap[a] || a);

  filterItems = (searchTerm, items, {subKey, displayKey, uniqueKey}) => {
    let filteredItems = [];
    let newFilteredItems = [];
    items.forEach(item => {
      const parts = this.removerAcentos(searchTerm.trim()).split(
        /[[ \][)(\\/?\-:]+/
      );
      const regex = new RegExp(`(${parts.join('|')})`, 'i');
      if (regex.test(this.getProp(item, displayKey))) {
        filteredItems.push(item);
      }
      if (item[subKey]) {
        const newItem = Object.assign({}, item);
        newItem[subKey] = [];
        item[subKey].forEach(sub => {
          if (regex.test(this.getProp(sub, displayKey))) {
            newItem[subKey] = [...newItem[subKey], sub];
            newFilteredItems = this.rejectProp(
              filteredItems,
              singleItem => item[uniqueKey] !== singleItem[uniqueKey]
            );
            newFilteredItems.push(newItem);
            filteredItems = newFilteredItems;
          }
        });
      }
    });
    return filteredItems;
  };

  onSelectedItemsChange = selectedItems => {
    console.log(selectedItems, selectedItems.length);

    if (selectedItems.length >= this.maxItems) {
      if (selectedItems.length === this.maxItems) {
        this.setState({selectedItems});
      }
      this.setState({
        maxItems: true
      });
      return;
    }
    this.setState({
      maxItems: false
    });
  };

  onConfirm = () => {
    this.setState({currentItems: this.state.selectedItems});
  };
  onCancel = () => {
    // this.SectionedMultiSelect._removeAllItems();

    this.setState({
      selectedItems: this.state.currentItems
    });
    console.log(this.state.selectedItems);
  };
  onSelectedItemObjectsChange = selectedItemObjects => {
    // let id
    // selectedItemObjects.filter((item) => {
    //   console.log(item.children && item.id)
    //   if (item.children) {
    //     id = item.id
    //   }
    // })
    // console.log('parent', id)
    // const selected = this.state.selectedItems.filter(item => item !== id)
    console.log('selected item objects', selectedItemObjects);

    this.setState({selectedItemObjects});
    // this.setState(prevState => ({
    //   selectedItems: [...prevState.selectedItems.filter(item => item !== id)],
    // }))
    // this.onSelectedItemsChange(this.state.selectedItems)
    // console.log(selectedItemObjects)
  };

  onSwitchToggle = k => {
    const v = !this.state[k];
    this.setState({[k]: v});
  };

  onToggleSwitch = (key, val) => this.setState({[key]: val});

  fetchCategories = () => {
    this.setState({hasErrored: false});
    fetch('http://www.mocky.io/v2/5a5573a22f00005c04beea49?mocky-delay=500ms', {
      headers: 'no-cache'
    })
      .then(response => response.json())
      .then(responseJson => {
        this.setState({cats: responseJson});
      })
      .catch(error => {
        this.setState({hasErrored: true});
        throw error.message;
      });
  };
  filterDuplicates = items =>
    items.sort().reduce((accumulator, current) => {
      const length = accumulator.length;
      if (length === 0 || accumulator[length - 1] !== current) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

  noResults = (
    <View key="a" style={styles.center}>
      <Text>Sorry! No results...</Text>
    </View>
  );

  handleAddSearchTerm = (searchTerm, submit) => {
    const id = (this.termId += 1);
    if (
      searchTerm.length &&
      !(this.state.items || []).some(item => item.title.includes(searchTerm))
    ) {
      const newItem = {id, title: searchTerm};
      this.setState(prevState => ({
        items: [...(prevState.items || []), newItem]
      }));
      this.onSelectedItemsChange([...this.state.selectedItems, id]);
      submit();
    }
  };

  renderSelectText = ({selectText, displayKey}) => {
    const {selectedItemObjects} = this.state;
    return selectedItemObjects && selectedItemObjects.length ? (
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <Text>{selectedItemObjects[0][displayKey]}</Text>
        </View>
        <View style={{flex: 0.2}}>
          <Text style={{flex: 1, fontSize: 10}}>{selectText}</Text>
        </View>
      </View>
    ) : (
      selectText
    );
    // return selectedItemObjects.length
    //   ? `I like ${selectedItemObjects
    //       .map((item, i) => {
    //         let label = `${item.title}, `;
    //         if (i === selectedItemObjects.length - 2) label = `${item.title} and `;
    //         if (i === selectedItemObjects.length - 1) label = `${item.title}.`;
    //         return label;
    //       })
    //       .join('')}`
    //   : 'Select a fruit';
  };
  searchAdornment = (searchTerm, submit) =>
    searchTerm.length ? (
      <TouchableOpacity
        style={{alignItems: 'center', justifyContent: 'center'}}
        onPress={() => this.handleAddSearchTerm(searchTerm, submit)}>
        <View>
          <Icon size={18} style={{marginHorizontal: 15}} name="add" />
        </View>
      </TouchableOpacity>
    ) : null;
  onToggleSelect = toggled => {
    console.log('select is ', toggled ? 'open' : 'closed');
  };
  customChipsRenderer = props => {
    console.log('props', props);
    return (
      <View style={{backgroundColor: 'yellow', padding: 15}}>
        <Text>Selected:</Text>
        {props.selectedItems.map(singleSelectedItem => {
          const item = this.SectionedMultiSelect._findItem(singleSelectedItem);

          if (!item || !item[props.displayKey]) return null;
          if (item[props.subKey] && item[props.subKey].length) return null;
          return (
            <View
              key={item[props.uniqueKey]}
              style={{
                flex: 0,
                marginRight: 5,
                padding: 10,
                backgroundColor: 'orange'
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.SectionedMultiSelect._removeItem(item);
                }}>
                <Text>{item[props.displayKey]}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  SelectOrRemoveAll = () => (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        height: 44,
        borderWidth: 0,
        paddingHorizontal: 10,
        backgroundColor: 'darkgrey',
        alignItems: 'center'
      }}
      onPress={this.SectionedMultiSelect._selectAllItems}>
      <Text style={{color: 'white', fontWeight: 'bold'}}>
        {this.state.selectedItems.length ? 'Remove' : 'Select'} all
      </Text>
    </TouchableOpacity>
  );

  getDisplayText = item => (item.title.en ? item.title.en : item.title);

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <ComponentExample
          {...this.state}
          styles={SMSStyles}
          onSelectedItemsChange={this.onSelectedItemsChange}
        />

        <View>
          <View style={styles.border}>
            <Text style={styles.heading}>Settings</Text>
          </View>
          <Toggle
            name="Single"
            onPress={() => this.onSwitchToggle('single')}
            val={this.state.single}
          />
          <Toggle
            name="Read only headings"
            onPress={() => this.onSwitchToggle('readOnlyHeadings')}
            disabled={
              this.state.parentsSelectAllChildren ||
              this.state.parentsHighlightAllChildren
            }
            val={this.state.readOnlyHeadings}
          />
          <Toggle
            name="Expand dropdowns"
            onPress={() => this.onSwitchToggle('expandDropDowns')}
            val={this.state.expandDropDowns}
            disabled={!this.state.showDropDowns}
          />
          <Toggle
            name="Show dropdown toggles"
            onPress={() => this.onSwitchToggle('showDropDowns')}
            val={this.state.showDropDowns}
          />
          <Toggle
            name="Auto-highlight children"
            onPress={() => this.onSwitchToggle('parentsHighlightAllChildren')}
            val={this.state.parentsHighlightAllChildren}
            disabled={
              this.state.parentsSelectAllChildren || this.state.readOnlyHeadings
            }
          />
          <Toggle
            name="Auto-select children"
            onPress={() => this.onSwitchToggle('parentsSelectAllChildren')}
            disabled={
              this.state.parentsHighlightAllChildren ||
              this.state.readOnlyHeadings
            }
            val={this.state.parentsSelectAllChildren}
          />
          <Toggle
            name="Hide Chip Remove Buttons"
            onPress={() => this.onSwitchToggle('hideChipRemove')}
            val={this.state.hideChipRemove}
          />
          <Toggle
            name="Parent Chips Remove Children"
            onPress={() => this.onSwitchToggle('parentChipsRemoveChildren')}
            val={this.state.parentChipsRemoveChildren}
          />
        </View>
      </ScrollView>
    );
  }
}

export default App;
