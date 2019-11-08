import React, { Component } from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Modal,
  StatusBar,
  TextInput,
  ActivityIndicator,
  ScrollView,
  Platform,
  TouchableHighlight,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { 
  getCaseData, 
  getUserCases 
} from "../store/actions"
import axios from "axios";
import {
  ListItem,
  Image,
  SearchBar,
  Button,
  CheckBox,
  Divider
} from "react-native-elements";
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons } from '@expo/vector-icons';

// import { Picker } from 'react-native-picker-dropdown';
import constants from "../helpers/constants";

// import screen components
// discontinued work on AddCaseScreen. Button and Modal also commented out below
// import AddCaseScreen from "./AddCaseScreen";
import CaseViewScreen from "./CaseViewScreen.js";
import Loader from "../components/Loader/Loader";

class FamilyConnectionsScreen extends Component {
  static navigationOptions = ({ navigation }) =>
    headerConfig("Family Connections", navigation);
  constructor(props) {
    super(props);
    this.state = {
      searchKeywords: "",
      gender: "Gender",
      ageRange: "Age Range",
      sortBy: "Sort By",
      modalVisible: false,
      filters: {
        male: false,
        female: false,
        unspecified: false,
        zero_five: false,
        six_nine: false,
        ten_thirteen: false,
        fourteen_eighteen: false,
        name: false,
        DOB: false,
        created: false,
        updated: false
      },
      caseVisible: false,
      addCaseModalVisible: true,
      pk: '',
    };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  setAddCaseModalVisible(visible) {
    this.setState({ addCaseModalVisible: visible });
  }

  setCaseVisible(visible) {
    this.setState({ caseVisible: visible });
  }

  handleKeywordChange = event => {
    this.setState({
      searchKeywords: event
    });
    // console.log(this.state.searchKeywords);
  };

  componentDidMount() {
    this.props.getUserCases();
  }

  genderAssignment = (gender) => {
    if (gender === 'M') {
      return 'Male'
    } else if (gender === 'F') {
      return 'Female'
    } else if (gender === 'O') {
      return 'Unspecified Gender'
    } else {
      return null
    }
  }

  render() {
    // ------GENDER FILTER functionality------
    let filteredCases = this.props.results; // this.state.results

    if (
      !this.state.filters.male &&
      !this.state.filters.female &&
      !this.state.filters.unspecified
    ) {
      //if nothing is selected -- do nothing
    } else {
      if (!this.state.filters.male) {
        filteredCases = filteredCases.filter(c => c.gender !== "M");
      } // if male is not selected -- remove all males
      if (!this.state.filters.female) {
        filteredCases = filteredCases.filter(c => c.gender !== "F");
      }
      if (!this.state.filters.unspecified) {
        filteredCases = filteredCases.filter(c => c.gender !== "O");
      }
    }

    // ------SORTING Functionality------
    const name = (a, b) => {
      const A = a.full_name.toUpperCase();
      const B = b.full_name.toUpperCase();
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    };

    const lastName = (a, b) => {
      const A = a.last_name.toUpperCase();
      const B = b.last_name.toUpperCase();
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    };

    const created = (a, b) => {
      const A = a.created_at;
      const B = b.created_at;
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    };

    const updated = (a, b) => {
      const A = a.updated_at;
      const B = b.updated_at;
      let comparison = 0;
      if (A > B) {
        comparison = 1;
      } else {
        comparison = -1;
      }
      return comparison;
    };

    if (this.state.filters.name) {
      filteredCases.sort(lastName);
    } else if (this.state.filters.created) {
      filteredCases.sort(created);
    } else if (this.state.filters.updated) {
      filteredCases.sort(updated);
    } else {
      filteredCases.sort(name);
    }

    // ------SEARCHBAR functionality - filters by case first_name or last_name---------
    let SearchedCases = filteredCases.filter(result => {
      return result.full_name.toLowerCase().indexOf(this.state.searchKeywords.toLowerCase()) != -1;
    });

    // const { navigate } = this.props.navigation;
    const fullYear = new Date();
    return (
      <SafeAreaView>
        <View style={{ flexDirection: "column", alignItems: 'flex-start', justifyContent: 'flex-start' }}>
        <SearchBar
            inputStyle={{fontSize: 16}}
            inputContainerStyle={{backgroundColor: '#FAFAFA', height: 45.62 }}
            placeholder="Search Name..."
            placeholderTextColor="#8D8383"
            // lightTheme
            round
            name="searchKeywords"
            value={this.state.searchKeywords}
            onChangeText={this.handleKeywordChange}
            // create searchbar target platform.os
            platform="ios"
            containerStyle={styles.searchBar}
          />
          <TouchableHighlight 
            onPressIn={() => {
                this.setModalVisible(true);
              }}>
            <View             
              style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingRight: 10}} 
            >
              <MaterialIcons
                name="filter-list"
                color='black'
                size={32}
              /><Text style={{fontSize: 16}}>Filter</Text>
            </View>
          </TouchableHighlight>
        </View>

        {/* FILTERS BUTTON - onPress Modal */}
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <ScrollView>
            <View
              style={{
                marginVertical: 100,
                justifyContent: "space-evenly",
                alignSelf: "center"
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}
              >
                Gender
              </Text>

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Male"
                size={16}
                checked={this.state.filters.male}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      male: !this.state.filters.male
                    }
                  })
                }
              />

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Female"
                size={16}
                checked={this.state.filters.female}
                onPress={this.checkHandler}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      female: !this.state.filters.female
                    }
                  })
                }
              />

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Unspecified"
                size={16}
                checked={this.state.filters.unspecified}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      unspecified: !this.state.filters.unspecified
                    }
                  })
                }
              />

              <Divider
                style={{ height: 1, backgroundColor: "lightgray", margin: 20 }}
              />

              <Text
                style={{ fontSize: 20, fontWeight: "800", textAlign: "center" }}
              >
                Sort By
              </Text>

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Last Name"
                size={16}
                checked={this.state.filters.name}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      name: !this.state.filters.name,
                      DOB: false,
                      created: false,
                      updated: false
                    }
                  })
                }
              />

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Date Created"
                size={16}
                checked={this.state.filters.created}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      name: false,
                      DOB: false,
                      created: !this.state.filters.created,
                      updated: false
                    }
                  })
                }
              />

              <CheckBox
                containerStyle={{
                  backgroundColor: "white",
                  borderColor: "white"
                }}
                title="Last Updated"
                size={16}
                checked={this.state.filters.updated}
                onPress={() =>
                  this.setState({
                    ...this.state,
                    filters: {
                      ...this.state.filters,
                      name: false,
                      DOB: false,
                      created: false,
                      updated: !this.state.filters.updated
                    }
                  })
                }
              />
            </View>
          </ScrollView>
          <View
            style={{
              alignContent: "center",
              marginVertical: 60,
              marginHorizontal: 30,
              fontSize: 80,
              fontWeight: "bold",
              paddingTop: -10
            }}
          >
            <TouchableHighlight>
              <Button
                buttonStyle={{ backgroundColor: constants.highlightColor }}
                title="Apply Filters"
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              />
            </TouchableHighlight>
          </View>
        </Modal>

        {/* Case List Todos:
       Cache case info from API for faster loading */}
        {/* Case List View Starts Here */}
        <View style={{ paddingBottom: 170 }}>
          <ScrollView>
            {this.props.isLoading ? (
              <Loader />
            ) : (
                SearchedCases.map((result, index) => (
                  <ListItem
                    key={index}
                    title={result.full_name}
                    titleStyle={{ color: "#5A6064" }}
                    subtitle={`${
                      result.gender ?
                        this.genderAssignment(result.gender)
                        : "Unspecified Gender"
                      } ${result.birthday ? `Birthday: ${result.birthday}`: ''}`}
                    subtitleStyle={{ color: "#9FABB3" }}
                    leftAvatar={{ source: { uri: result.picture } }}
                    to pDivider={true}
                    onPress={async () => {
                      this.props.navigation.navigate('CaseView', {pk: result.pk, caseData: result})
                      
                    }}
                  />
                ))
              )}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

// Todos:
// Create styles that target both platforms
const styles = StyleSheet.create({
  searchBar: {
    marginRight: 5,
    marginLeft: 5,
    width: '97%',
    backgroundColor: Platform.OS === "ios" ? "white" : "white",
  },
  filterButton: {
    width: Platform.OS === "ios" ? 70 : 70,
    marginVertical: Platform.OS === "ios" ? 20 : 20,
    maxHeight: Platform.OS === "ios" ? 40 : 40,
  },
  isLoading: {
    textAlign: "center",
    fontSize: 20,
    flex: 1,
    marginTop: 240,
    color: "black"
  }
});

const mapStateToProps = state => {
  const { 
    caseData 
  } = state.caseData;
  const {
    results,
    isLoading,
    caseDataError,
  } = state.userCases;

  return {
    results,
    caseData,
    isLoading,
    caseDataError,
  };
};

export default connect(
  mapStateToProps, { 
    getUserCases, 
    getCaseData,
  })(FamilyConnectionsScreen);