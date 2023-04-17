import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { ScrollView } from 'react-native';

export default function AboutUs() {
    return (
        <Layout style={{ flex: 1, paddingRight: '5%', paddingLeft: '5%', paddingTop: '5%', alignContent: 'center' }}>
            <ScrollView>
                <View>
                    <Text style={styles.text}>
                        Acreditamos que a beleza é uma forma de expressão pessoal, e estamos empenhados em ajudar os nossos clientes a
                        sentirem-se confiantes e radiantes na sua própria pele. Oferecemos uma ampla gama de serviços de estética, incluindo
                        depilação, threading, unhas e pestanas, para satisfazer as necessidades de beleza dos nossos clientes.
                        {'\n'}{'\n'}
                        Acreditamos que a beleza vai além da aparência exterior, e dedicamo-nos a promover o bem-estar interior dos nossos clientes.
                        O nosso objetivo é que cada cliente saia da Pequena Ametista sentindo-se revigorado, confiante e satisfeito com os resultados obtidos.
                        {'\n'}{'\n'}
                        Escolha a Pequena Ametista para os seus serviços de depilação, threading, unhas e pestanas, e experimente um atendimento de primeira
                        classe e resultados excecionais. Estamos ansiosos por recebê-lo(a) na nossa clínica e ajudá-lo(a) a realçar a sua beleza natural.
                    </Text>
                    <Text style={styles.titles}>Profissionais</Text>
                    <Text style={styles.text}>
                        Somos especializados em técnicas avançadas de depilação e threading, oferecendo resultados
                        precisos e duradouros. Utilizamos produtos de alta qualidade e técnicas de higiene rigorosas para garantir uma experiência
                        segura e confortável para os nossos clientes.
                        {'\n'}{'\n'}
                        Além disso, os nossos serviços de unhas e pestanas são projetados para realçar a beleza dos olhos e das mãos, proporcionando
                        um visual elegante e sofisticado. Estamos sempre atualizados com as últimas tendências e técnicas
                        de moda, garantindo que os nossos clientes recebam serviços de unhas e pestanas de última geração.
                    </Text>
                    <Text style={styles.titles}>Novidades</Text>
                    <Text style={styles.text}>
                        Uma das nossas recentes novidades é a nossa aplicação de agendamentos online, que foi projetada para tornar a vida dos
                        nossos clientes mais fácil e conveniente. Com a nossa aplicação, os clientes podem agendar e gerenciar os seus compromissos
                        de forma rápida e fácil, a qualquer hora e em qualquer lugar. A nossa aplicação também oferece lembretes de agendamento
                        para garantir que não perca o seu compromisso.
                    </Text>
                    <Text style={styles.titles}>Instalações e Atendimento</Text>
                    <Text style={styles.text}>
                        A nossa prioridade é proporcionar uma experiência excepcional aos nossos clientes. As nossas instalações são limpas
                        e modernas, e a nossa equipe é amigável e altamente qualificada. Estamos empenhados em oferecer um atendimento personalizado,
                        compreendendo as necessidades e expectativas de cada cliente, e recomendando os melhores tratamentos para alcançar os
                        resultados desejados.
                    </Text>
                </View>
            </ScrollView>
        </Layout>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: '300',
        fontSize: 15,
        textAlign: 'justify',
        marginBottom: '15%',
    },

    titles: {
        fontSize: '22',
        fontWeight: '400',
        marginBottom: '5%'
    },
});
