import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import SvgUri from 'react-native-svg-uri';

import {
  commentOnCampaign,
  deleteComment,
  getCampaign
} from '../../store/actions';
import Comment from './Comment';

import styles from '../../constants/Comments/Comments';

class CommentsView extends React.Component {
  state = {
    comment: '',
    latestComment: '',
    posted: false,
    campaignComments: [],
    commentsVisible: 3,
    err: ''
  };

  addMoreComments = () => {
    this.setState({
      ...this.state,
      commentsVisible: this.state.commentsVisible + 9
    });
  };

  render() {
    console.log('selectedcampaign', this.props.selectedCampaign);

    return (
      <KeyboardAvoidingView>
        {/* Displays latest comment unless the user is viewing all the campaign comments. */}
        {this.props.selectedCampaign.comments?.length >
          Math.abs(this.state.commentsVisible) && (
          <View style={styles.moreContainer}>
            <TouchableOpacity onPress={() => this.addMoreComments()}>
              <View style={styles.more}>
                <Text style={styles.moreText}>View More Comments</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
        {/*comment sort order needs to be fixed*/}
        <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
          {this.props.selectedCampaign.comments
            .slice(0, this.state.commentsVisible)
            .map(comment => {
              return (
                <Comment
                  key={comment.comment_id}
                  comment={comment}
                  currentUserProfile={this.props.currentUserProfile}
                  selectedCampaign={this.props.selectedCampaign}
                  deleteComment={this.deleteComment}
                />
              );
            })}
        </View>
        {/* View More Comments is visible if the length of campaignComments is greater than the value of commentsVisible */}
        <View style={styles.replyView}>
          <View style={styles.replyAvatar}>
            <Avatar
              rounded
              source={{
                uri: this.props.currentUserProfile.profile_image
              }}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Be a part of the conversation...'
              onChangeText={text =>
                this.setState({ comment: text, latestComment: text })
              }
              style={styles.input}
              value={this.state.comment}
              textAlignVertical={'center'}
              onSubmitEditing={() => {
                if (Platform.OS === 'android') return;
                this.usernameInput.focus();
              }}
              blurOnSubmit={Platform.OS === 'android'}
              ref={input => {
                this.commentInput = input;
              }}
              returnKeyType='next'
            />
            {this.state.comment === null || this.state.comment === '' ? (
              <TouchableOpacity style={styles.commentButton}>
                <SvgUri
                  width='26'
                  height='26'
                  source={require('../../assets/icons/inactive_comment.svg')}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.commentButton}
                onPress={() => {
                  this.setState({ comment: '' });
                  this.props.commentOnCampaign(
                    this.props.selectedCampaign.camp_id,
                    this.state.comment.trim()
                  );
                }}
              >
                <SvgUri
                  width='26'
                  height='26'
                  source={require('../../assets/icons/active_comment.svg')}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  currentUserProfile: state.currentUserProfile,
  selectedCampaign: state.selectedCampaign
});

export default connect(mapStateToProps, {
  commentOnCampaign,
  deleteComment,
  getCampaign
})(CommentsView);
