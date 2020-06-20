import React from 'react';
import {
  TextInput,
  Text,
  View,
  Platform,
  Alert,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { postCampaign } from '../store/actions';
import BackButton from '../components/BackButton';
import UploadMedia from '../components/UploadMedia';

import styles from '../constants/screens/CreateCampaignScreen';
import CheckMark from '../assets/icons/checkmark-24.png';
import { shorten } from '../util';
import Lightening from '../assets/jsicons/bottomnavigation/Lightening';
import SelectSkillsContent from '../components/CampaignBuilder/SkillImpact/SelectSkillsContent';
import SkillDescriptionForm from '../components/CampaignBuilder/SkillImpact/SkillDescriptionForm';

class CreateCampaignScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'CREATE A CAMPAIGN',
      headerStyle: {
        backgroundColor: '#323338',
      },
      headerTintColor: '#fff',
      headerLeft: () => (
        <BackButton
          navigation={navigation}
          content="Cancel"
          confirm="Are you sure you want to cancel? Any progress will be lost"
        />
      ),
      gestureEnabled: false,
    };
  };

  constructor(props) {
    super(props);

    this.URGENCY_LEVELS = [
      {
        title: 'Critical',
        description:
          'Dire consequences may occur of no immediate support is made available',
        color: '#E31059',
      },
      {
        title: 'Urgent',
        description:
          'Immediate support needed, although situation is not critical',
        color: '#FFC700',
      },
      {
        title: 'Longterm',
        description: 'Support is needed over a longer period of time',
        color: '#00FF9D',
      },
    ];
  }

  state = {
    image: '',
    user_id: this.props.currentUserProfile.id,
    name: '',
    description: '',
    call_to_action: '',
    skillImpactRequests: new Map(),
    urgency: null,
  };

  setUrgency = (urgencyLevel) => {
    if (this.state.urgency === urgencyLevel) {
      this.setState({
        urgency: null,
      });
    } else {
      this.setState({
        urgency: urgencyLevel,
      });
    }
  };

  isProjectGoalArrValid = (projectGoalArr) => {
    for (const entry of projectGoalArr) {
      if (entry.description == '' || entry.goal_title == '') {
        return false;
      }
    }
    return true;
  };

  isSkillImpactRequestValid = (skillImpactRequestMap) => {
    if (skillImpactRequestMap.size == 0) {
      return true;
    } else {
      for (const [key, entry] of skillImpactRequestMap) {
        if (
          entry.skill == '' ||
          entry.point_of_contact == '' ||
          entry.our_contribution == '' ||
          !this.isProjectGoalArrValid(entry.project_goals)
        ) {
          return false;
        }
      }
      return true;
    }
  };

  publish = () => {
    if (
      !this.state.image ||
      !this.state.name ||
      !this.state.description ||
      !this.isSkillImpactRequestValid(this.state.skillImpactRequests) ||
      !this.state.urgency
    ) {
      const errorMessage =
        'Form incomplete. Please include:' +
        (this.state.image ? '' : '\n    - Campaign Image') +
        (this.state.name ? '' : '\n    - Campaign Name') +
        (this.state.description ? '' : '\n    - Campaign Details') +
        (this.isSkillImpactRequestValid(this.state.skillImpactRequests)
          ? ''
          : '\n    - Skill Impact Requests Form') +
        (this.state.urgency ? '' : '    - Urgency Level\n ');
      return Alert.alert('Error', errorMessage);
    } else {
      const campaign = {
        user_id: this.props.currentUserProfile.id,
        name: this.state.name,
        description: this.state.description,
        call_to_action: this.state.call_to_action,
        urgency: this.state.urgency,
        image: this.state.image,
        skilledImpactRequests: JSON.stringify(
          Array.from(this.state.skillImpactRequests.values())
        ),
      };
      this.props.postCampaign(campaign);
      this.props.navigation.goBack();
    }
  };

  clearState = () => {
    this.setState({
      user_id: this.props.currentUserProfile.id,
      image: '',
      name: '',
      description: '',
      call_to_action: '',
      skillImpactRequests: new Map(),
      urgency: null,
    });
  };

  render() {
    const skillList = Array.from(this.state.skillImpactRequests.keys()).map(
      (skill, index) => {
        return (
          <SkillDescriptionForm
            key={index}
            skill={skill}
            skillImpactRequests={this.state.skillImpactRequests}
            onChangeSkills={(skillsMap) =>
              this.setState({ skillImpactRequests: skillsMap })
            }
          />
        );
      }
    );
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <NavigationEvents onDidBlur={this.clearState} />
        <View style={styles.sectionContainer}>
          <View style={styles.horizontalContainer}>
            <View style={styles.iconContainer}>
              <Lightening fill="#00FF9D" />
            </View>
            <TextInput
              ref={(input) => {
                this.campaignNameInput = input;
              }}
              returnKeyType="next"
              placeholder="Name Campaign"
              style={styles.inputContain}
              onChangeText={(text) => this.setState({ name: text })}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.campImgUrlInput.focus();
              }}
              blurOnSubmit={Platform.OS === 'android'}
              value={this.state.name}
              maxLength={70}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.horizontalContainer}>
            <View style={styles.iconContainer}>
              <UploadMedia
                title="Upload campaign image"
                media={this.state.image}
                onChangeMedia={(media) => this.setState({ image: media })}
              />
            </View>
            <TextInput
              ref={(input) => {
                this.campaignDetailsInput = input;
              }}
              returnKeyType="next"
              placeholder="Add campaign details and list of monetary needs."
              style={styles.inputContain2}
              onChangeText={(text) => this.setState({ description: text })}
              multiline={true}
              value={this.state.description}
            />
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionsText}>Urgency Level</Text>
          <Text style={styles.bodyText}>
            Select one. This can be changed at a future date.
          </Text>
          <View style={styles.urgencyMenu}>
            {this.URGENCY_LEVELS.map((urgency, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.setUrgency(urgency.title)}
              >
                <View style={styles.urgencyOption}>
                  <View style={styles.urgencyText}>
                    <Text
                      style={{
                        ...styles.urgencyLevelTitle,
                        color: urgency.color,
                      }}
                    >
                      {urgency.title}
                    </Text>
                    <Text style={styles.urgencyDescription}>
                      {urgency.description}
                    </Text>
                  </View>
                  <View style={styles.urgencyCheckmarkContainer}>
                    {this.state.urgency === urgency.title ? (
                      <Image style={styles.checkMark} source={CheckMark} />
                    ) : null}
                  </View>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionsText}>Request donated funds</Text>
          <Text style={{color: 'gray'}}>Coming soon</Text>
          {/* <TextInput
            ref={(input) => {
              this.donationLinkInput = input;
            }}
            returnKeyType="next"
            keyboardType="default"
            placeholder="Please include full URL"
            autoCapitalize="none"
            style={styles.inputContain}
            onChangeText={(text) => this.setState({ call_to_action: text })}
            value={this.state.call_to_action}
          /> */}
        </View>
        <SelectSkillsContent
          skillImpactRequests={this.state.skillImpactRequests}
          onChangeSkills={(skillsMap) =>
            this.setState({ skillImpactRequests: skillsMap })
          }
        />
        {skillList}
        <View style={styles.sectionContainer}>
          <TouchableOpacity onPress={this.publish}>
            <View style={styles.publishButton}>
              <Text style={styles.publishButtonText}>Publish Live</Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUserProfile: state.currentUserProfile,
  allCampaigns: state.allCampaigns,
  token: state.token,
});

export default connect(mapStateToProps, {
  postCampaign,
})(CreateCampaignScreen);
