import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch,
  Alert,
  Image,
  TextInput
} from 'react-native';
import styles from '../../constants/screens/org-onboarding-styles/ReviewYourInfo';
import NavigateButton from './formElement/NavigateButton.js';
import NavigateBack from './formElement/NavigateBack.js';
import ProgressBar from './formElement/ProgressBar';
import ItemCard from '../../components/Onboarding/ItemCard';
import * as SecureStore from 'expo-secure-store';
import SVGCheckMark from '../../assets/jsicons/SVGCheckMark';
import EditPencil from '../../assets/jsicons/OnBoarding/EditPencil';
import UploadMedia from '../../components/UploadMedia';
import { connect } from 'react-redux';

const ReviewYourInfoScreen = props => {
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingOrganization, setIsEditingOrganization] = useState(false);
  const [isEditingAffiliations, setIsEditingAffiliations] = useState(false);
  const [isEditingMisc, setIsEditingMisc] = useState(false);

  const [airtableId, setAirtableId] = useState('');

  const [state, setState] = useState({
    // username: '',
    other_countries: '',
    multiple_projects: '',
    affiliations_partnerships: '',
    conservation_optimism: null,
    smartphone_access: null,
    smartphone_type: '',
    org_name: '',
    org_link_url: '',
    twitter: '',
    facebook: '',
    instagram: '',
    location: '',
    country: '',
    phone_number: '',
    point_of_contact_name: '',
    point_of_contact_position: '',
    email: '',
    about_us: '',
    species_and_habitats: '',
    org_cta: '',
    mini_bio: '',
    about_us: '',
    profile_image: ''
  });

  useEffect(() => {
    // Grabs state for backend through nav params again.
    setState(props.navigation.getParam('airtableState', 'defaultValue'));
    getAirtableID();
    // console.log('profile_image from Review', state.profile_image);
    console.log('ReviewInfoScreen', state);
  }, []);

  const getAirtableID = async () => {
    const id = await SecureStore.getItemAsync('airtableID', {});
    setAirtableId(id);
  };

  const key = props.navigation.getParam('airtableKey', 'defaultValue');

  // Updates corresponding airtable form if any fields are changed.
  const updateAirtable = () => {
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: key }).base('appbPeeXUSNCQWwnQ');
    base('Table 1').update(
      [
        {
          id: airtableId,
          fields: {
            other_countries: state.other_countries,
            affiliations_partnerships: state.affiliations_partnerships,
            conservation_optimism: state.conservation_optimism,
            multiple_projects: state.multiple_projects,
            smartphone_access: state.smartphone_access,
            smartphone_type: state.smartphone_type,
            org_name: state.org_name,
            website: state.org_link_url,
            phone: state.phone_number,
            address: state.location,
            country: state.country,
            point_of_contact: state.point_of_contact_name,
            poc_position: state.point_of_contact_position,
            email: state.email
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {});
      }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.arrowView}>
          <NavigateBack
            onButtonPress={() => {
              props.navigation.navigate('AccountScreen');
            }}
            color='#000'
          />
        </View>
        <View style={styles.progressBar}>
          <ProgressBar
            progress={100}
            height={9}
            backgroundColor='#D7FF44'
            animated={false}
          />
          <Text style={styles.progressBarText}>100% Complete!</Text>
        </View>
      </View>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior='height'
        keyboardVerticalOffset={86}
        enabled
      >
        <ScrollView style={styles.obBody}>
          <Text style={styles.obTitle}>Review your Information</Text>
          <View>
            <View>
              <Text style={styles.obText}>
                Check that everything looks good and tap submit, or click the
                pencil icon to edit.
              </Text>
            </View>

            {!isEditingContact ? (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={styles.obSubtitle}>Basic Information</Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingContact(!isEditingContact)}
                  >
                    <EditPencil />
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Name</Text>
                  <Text style={styles.obFieldName}>{state.org_name}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Address</Text>
                  <Text style={styles.obFieldName}>{state.location}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Country</Text>
                  <Text style={styles.obFieldName}>{state.country}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Website</Text>
                  <Text style={styles.obFieldName}>{state.org_link_url}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Phone</Text>
                  <Text style={styles.obFieldName}>{state.phone_number}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Facebook</Text>
                  <Text style={styles.obFieldName}>{state.facebook}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Twitter</Text>
                  <Text style={styles.obFieldName}>{state.twitter}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Instagram</Text>
                  <Text style={styles.obFieldName}>{state.instagram}</Text>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Donation Link</Text>
                  <Text style={styles.obFieldName}>{state.org_cta}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={styles.obSubtitle}>Basic Information</Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingContact(!isEditingContact)}
                  >
                    <SVGCheckMark />
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Name</Text>
                  <TextInput
                    style={[styles.obFieldName, styles.textInput]}
                    value={state.org_name}
                    setState={text => setState({ ...state, org_name: text })}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Address</Text>
                  <TextInput
                    style={[styles.obFieldName, styles.textInput]}
                    // multiline
                    value={state.location}
                    setState={text => setState({ ...state, location: text })}
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Country</Text>
                  <TextInput
                    style={[styles.obFieldName, styles.textInput]}
                    // multiline
                    value={state.country}
                    setState={text => setState({ ...state, country: text })}
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Website</Text>
                  <TextInput
                    style={[styles.obFieldName, styles.textInput]}
                    value={state.org_link_url}
                    setState={text =>
                      setState({ ...state, org_link_url: text })
                    }
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Phone</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.phone_number}
                    setState={text =>
                      setState({ ...state, phone_number: text })
                    }
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Facebook</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.facebook}
                    setState={text => setState({ ...state, facebook: text })}
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Twitter</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.twitter}
                    setState={text => setState({ ...state, twitter: text })}
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Instagram</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.instagram}
                    setState={text => setState({ ...state, instagram: text })}
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Donation Link</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.org_cta}
                    setState={text => setState({ ...state, org_cta: text })}
                  />
                </View>
              </View>
            )}

            {!isEditingAccount ? (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    Account Administrator
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingAccount(!isEditingAccount)}
                  >
                    <EditPencil />
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Contact Name: </Text>
                  <Text style={styles.obText}>
                    {state.point_of_contact_name}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Contact Position: </Text>
                  <Text style={styles.obText}>
                    {state.point_of_contact_position}
                  </Text>
                </View>
              </View>
            ) : (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    Account Administrator
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingAccount(!isEditingAccount)}
                  >
                    <SVGCheckMark />
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Contact Name: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.point_of_contact_name}
                    placeholder={'Point of Contact Name'}
                    setState={text =>
                      setState({ ...state, point_of_contact_name: text })
                    }
                  />
                </View>
                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Contact Position: </Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.point_of_contact_position}
                    placeholder={' Contact Position'}
                    setState={text =>
                      setState({ ...state, point_of_contact_position: text })
                    }
                  />
                </View>
              </View>
            )}

            <View style={styles.borderContainer}>
              <View style={[styles.row, styles.opaqueHeader]}>
                <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                  Organization Logo
                </Text>
              </View>
              <UploadMedia circular title='Change logo' />
              {state.profile_image ? (
                <Image
                  source={{ uri: state.profile_image }}
                  style={{
                    height: 300,
                    width: 300
                  }}
                />
              ) : null}
            </View>

            {!isEditingAccount ? (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    About Us
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingAccount(!isEditingAccount)}
                  >
                    <EditPencil />
                  </TouchableOpacity>
                </View>
                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Short Bio</Text>
                  <Text style={styles.obText}>{state.mini_bio}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>About Us: </Text>
                  <Text style={styles.obText}>{state.about_us}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    About Us
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingAccount(!isEditingAccount)}
                  >
                    <SVGCheckMark />
                  </TouchableOpacity>
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>Mini Bio</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.mini_bio}
                    placeholder={'Mini Bio'}
                    setState={text => setState({ ...state, mini_bio: text })}
                  />
                </View>

                <View style={styles.row}>
                  <Text style={styles.obSubtitleSm}>ABout Us</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.about_us}
                    placeholder={'About us'}
                    setState={text => setState({ ...state, about_us: text })}
                  />
                </View>
              </View>
            )}
            {!isEditingOrganization ? (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    Organization Details
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setIsEditingOrganization(!isEditingOrganization)
                    }
                  >
                    <EditPencil />
                  </TouchableOpacity>
                </View>
                <Text style={styles.obSubtitleSm}>
                  Countries your organization works in:
                </Text>
                <ItemCard
                  item={state.other_countries}
                  isEditingOrganization={isEditingOrganization}
                />
                <Text style={styles.obText}>{state.other_countries}</Text>
                <View>
                  <Text style={styles.obSubtitleSm}>Projects</Text>
                  <Text style={styles.obText}>{state.multiple_projects}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    Organization Details
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setIsEditingOrganization(!isEditingOrganization)
                    }
                  >
                    <SVGCheckMark />
                  </TouchableOpacity>
                </View>
                <Text style={styles.obSubtitleSm}>
                  Countries your organization works in:
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={state.other_countries}
                  setState={text =>
                    setState({ ...state, other_countries: text })
                  }
                />

                <View>
                  <Text style={styles.obSubtitleSm}>Projects</Text>
                  <TextInput
                    style={styles.textInput}
                    value={state.multiple_projects}
                    setState={text => {
                      setState({
                        ...state,
                        multiple_projects: text
                      });
                    }}
                  />
                </View>
              </View>
            )}
            {!isEditingAffiliations ? (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    Partnerships & Affiliations
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setIsEditingAffiliations(!isEditingAffiliations)
                    }
                  >
                    <EditPencil />
                  </TouchableOpacity>
                </View>
                <Text style={styles.obText}>
                  {state.affiliations_partnerships}
                </Text>
              </View>
            ) : (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    Partnerships & Affiliations
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      setIsEditingAffiliations(!isEditingAffiliations)
                    }
                  >
                    <SVGCheckMark />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.textInput}
                  value={state.affiliations_partnerships}
                  setState={text => {
                    setState({
                      ...state,
                      affiliations_partnerships: text
                    });
                  }}
                />
              </View>
            )}
            {!isEditingMisc ? (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    Miscellaneous Items
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingMisc(!isEditingMisc)}
                  >
                    <EditPencil />
                  </TouchableOpacity>
                </View>

                {state.conservation_optimism && (
                  <Text style={styles.obText}>
                    We will join Key Conservation in practicing Conservation
                    Optimism.
                  </Text>
                )}
                {state.smartphone_access && (
                  <Text style={styles.obText}>
                    Our Organization does use smartphones.
                  </Text>
                )}
              </View>
            ) : (
              <View style={styles.borderContainer}>
                <View style={[styles.row, styles.opaqueHeader]}>
                  <Text style={[styles.obSubtitle, { marginRight: 20 }]}>
                    Miscellaneous Items
                  </Text>
                  <TouchableOpacity
                    onPress={() => setIsEditingMisc(!isEditingMisc)}
                  >
                    <EditPencil />
                  </TouchableOpacity>
                </View>
                <View style={styles.column}>
                  <Text style={styles.obText}>
                    Will you join us in Conservation Optimism?
                  </Text>
                  <Switch
                    trackColor={{ true: '#00FF9D' }}
                    style={styles.obSwitchButton}
                    value={state.conservation_optimism}
                    onValueChange={newValue =>
                      setState({ ...state, conservation_optimism: newValue })
                    }
                  />
                </View>
                <View style={styles.column}>
                  <Text style={styles.obText}>
                    Does your organization have access to a smartphone?
                  </Text>
                  <Switch
                    style={styles.obSwitchButton}
                    trackColor={{ true: '#00FF9D' }}
                    value={state.smartphone_access}
                    onValueChange={newValue =>
                      setState({ ...state, smartphone_access: newValue })
                    }
                  />
                </View>
              </View>
            )}
            <NavigateButton
              label='Next'
              onButtonPress={async () => {
                if (
                  state.org_name === undefined ||
                  state.org_link_url === undefined ||
                  state.phone_number === undefined ||
                  state.location === undefined ||
                  state.country === undefined ||
                  state.point_of_contact_name === undefined ||
                  state.point_of_contact_position === undefined ||
                  state.email === undefined
                ) {
                  Alert.alert('Oops', 'Please fill in all sections of form', [
                    { text: 'Got it' }
                  ]);
                } else {
                  updateAirtable();
                  const sub = await SecureStore.getItemAsync('sub', {});
                  if (props.mediaUpload) {
                    setState({ ...state, profile_image: props.mediaUpload });
                  }
                  const stringBE = JSON.stringify({
                    org_name: state.org_name,
                    org_link_url: state.org_link_url,
                    twitter: state.twitter,
                    facebook: state.facebook,
                    instagram: state.instagram,
                    location: state.location,
                    country: state.country,
                    phone_number: state.phone_number,
                    point_of_contact_name: state.point_of_contact_name,
                    email: state.email,
                    about_us: state.about_us,
                    species_and_habitats: state.species_and_habitats,
                    org_cta: state.org_cta,
                    mini_bio: state.mini_bio,
                    about_us: state.about_us,
                    roles: 'conservationist',
                    sub: sub,
                    profile_image: state.profile_image
                  });

                  // Stores data object in SecureStore to be sent to backend once user is vetted
                  SecureStore.setItemAsync('stateBE', stringBE);

                  // Sets variables to be checked in 'LoadingScreen' to determine whether current user is in vetting process.
                  SecureStore.setItemAsync('vetting', 'true');

                  // Passes updated state down for backend.
                  props.navigation.navigate('VerifyDocumentation', {
                    airtableStateAdd: state,
                    airtableKey: key
                  });
                }
              }}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = state => ({
  mediaUpload: state.mediaUpload
});

export default connect(mapStateToProps, {})(ReviewYourInfoScreen);
