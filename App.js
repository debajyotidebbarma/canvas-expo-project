import React, { useReducer, useRef, useState } from 'react';
import { SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { PRODUCT_CATALOG } from './Data/product_catalog';
import Header from './components/Header';
import ChatMessages from './components/ChatMessages';
import ChatComposer from './components/ChatComposer';
import styles from './components/style/styles';
import { initialState, reducer } from './components/utils/reducer';
import { getAIRecommendations } from './components/utils/AIHandler';
import LogoImage from './assets/AI-logo.png';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainApp />
    </SafeAreaProvider>
  );
}

export function MainApp() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editingIndex, setEditingIndex] = useState(null);
  const scrollViewRef = useRef();
  const typingControllerRef = useRef(null);
  const insets = useSafeAreaInsets();

  const scrollToBottom = () => scrollViewRef.current?.scrollToEnd({ animated: true });

  const handleSendOrUpdate = async (text) => {
    if (!text.trim()) return;

    if (editingIndex !== null) {
      dispatch({ type: 'EDIT_MESSAGE', index: editingIndex, text });
      dispatch({ type: 'REMOVE_AFTER_INDEX', index: editingIndex });
      dispatch({ type: 'SET_QUERY', payload: '' });
      await handleAIResponse(text);
      setEditingIndex(null);
      return;
    }

    dispatch({ type: 'ADD_MESSAGE', payload: { text, type: 'user' } });
    dispatch({ type: 'SET_QUERY', payload: '' });
    await handleAIResponse(text);
  };

  const handleAIResponse = async (queryText) => {
    await getAIRecommendations({
      queryText,
      dispatch,
      scrollToBottom,
      typingControllerRef,
    });
  };

  const handleStop = () => {
    if (typingControllerRef.current) {
      typingControllerRef.current.stop();
      typingControllerRef.current = null;
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  const handleEdit = (idx) => {
    if (typingControllerRef.current) {
      typingControllerRef.current.stop();
      typingControllerRef.current = null;
    }
    dispatch({ type: 'SET_LOADING', payload: false });

    setEditingIndex(idx);
    dispatch({ type: 'SET_QUERY', payload: state.messages[idx].text });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <Header logo={LogoImage} />

        <ChatMessages
          messages={state.messages}
          scrollRef={scrollViewRef}
          onEdit={handleEdit}
          scrollToBottom={scrollToBottom}
        />

        <ChatComposer
          query={state.query}
          onChangeText={(text) => dispatch({ type: 'SET_QUERY', payload: text })}
          onSend={handleSendOrUpdate}
          onStop={handleStop}
          loading={state.loading}
          editingIndex={editingIndex}
          insetsBottom={insets.bottom}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
