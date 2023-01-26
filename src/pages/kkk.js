<View style={styles.btnLogin}>
              <Button title='Continuar' color='#fff' onPress={() => {
                const auth = getAuth();

                signInWithEmailAndPassword(auth, Email, Password)
                  .then((userCredencial) => {
                    onAuthStateChanged(auth, (user) => {
                      if (user) {
                        const uid = user.uid;

                        navigation.navigate('Shedule', {
                          UID: uid
                        })
                      } else {
                        console.log('Não possui registos.')
                      }
                    });
                  })

                  .catch((error) => {
                    setVisible(true)

                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode)
                  });
              }} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%' }}>
              <Text>Ainda não tem conta?</Text><Text style={{ color: '#8288C3' }} onPress={() => navigation.navigate('SignIn')}> Criar</Text>
            </View>

            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}>
              <Card disabled={true} style={{ borderRadius: 15, }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <Icon
                    style={styles.warnicon}
                    fill='red'
                    name='alert-triangle-outline'
                  />
                  <Text style={{ marginBottom: 20, fontWeight: 'bold', }}>Alerta!</Text>
                </View>
                <Text> Palavra-passe ou endereço de email incorretos.</Text>
                <Button title='Tentar Novamente' style={styles.btnok} onPress={() => setVisible(false)} />
              </Card>
            </Modal>