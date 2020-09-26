import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Image
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import QuoteIcon from './assets/quote.png'

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteClicked: false,
      contentStyle: {
        backgroundColor: 'white',
        color: 'black',
        placeholderColor: 'gray',
        cssText: '#editor {background-color: #f3f3f3}', // initial valid
        contentCSSText: 'border-left: 10px solid #dede; padding-left: 10px'
      }
    }
  }

  handleChange = async() => {
    this.setState({
      quoteClicked: !this.state.quoteClicked
    })
    if(!this.state.quoteClicked) {
      this.richtext.focusContentEditor();
      this.richtext.insertHTML('<h3 style="margin: 0 20px; border-left: solid; padding: 10px;"></h3>')
      this.richtext.setContentStyle('#editor{backgroundColor: "red"}')
      // this.richtext.blurContentEditor();
    }
    
    // Here I want to be able to toggle the quote
  }

  render() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar />
            <Text>{this.state.quoteClicked ? 'on' : 'off'}</Text>
            <Text style={styles.headingText}>Text-Editor</Text>
            <ScrollView>
              <RichEditor
                editorStyle={this.state.quoteClicked ? this.state.contentStyle : ''}
                ref={(c) => this.richtext = c}
                placeholder={'Type here'}
                onTouchEnd={() => this.handleChange()}
                onChange={item => console.log(item)}
              />
            </ScrollView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <RichToolbar
                style={styles.toolbar}
                getEditor={() => this.richtext}
                actions={[
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.insertLink,
                  'setQuote'
                ]}
                // editorInitializedCallback={this.editorInitializedCallback()}
                iconMap={{
                  ['setQuote']: () => (
                    <Image source={QuoteIcon} style={{ height: 20, width: 20, marginLeft: 10, tintColor: '#808080' }} />
                  ),
                }}
                setQuote={() => this.handleChange()}
                iconTint={"#000033"}
                selectedIconTint={"#2095F2"}
                selectedButtonStyle={{ backgroundColor: "transparent" }}
              />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dede',
    flex: 1
  }, 
  toolbar: {
    height: 80,
    backgroundColor: '#F5FCFF',
    marginBottom: 40,
    width: '100%'
  },
  headingText: {
    textAlign: 'center',
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  }
});
