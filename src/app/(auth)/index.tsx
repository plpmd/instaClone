import Button from '@/src/components/Button'
import TextInput from '@/src/components/TextInput'
import { supabase } from '@/src/lib/supabase'
import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState } from 'react-native'

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          header='Email'
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
        />

      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          header='Senha'
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="Password"
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button text="Entrar" onPress={() => signInWithEmail()} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button text="Criar conta" onPress={() => signUpWithEmail()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
