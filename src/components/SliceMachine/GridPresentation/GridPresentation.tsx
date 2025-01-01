
import React from 'react';
import {
    Container,
    SimpleGrid,
    Stack,
    Card,
    Text,
    Group,
    Button,
} from '@mantine/core';
import styles from './GridPresentation.module.scss';

export const GridPresentation = ({ services, contactInfo }: { services: any[]; contactInfo: any }) => {
    return (
        <section className={styles.section}>
            <Container>
                <h1>Nos services</h1>
                {/* @ts-ignore */}
                <SimpleGrid cols={2} spacing="lg" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
                    {/* Services Section */}
                    {/* @ts-ignore */}
                    <Stack spacing="lg">
                        {services.map((service, index) => (
                            <Card key={index} shadow="md" radius="md" p="lg" className={styles.serviceCard}>
                                {/* @ts-ignore */}
                                <Text weight={700} size="lg" mb="sm">
                                    {service.title}
                                </Text>
                                <Text size="sm" color="dimmed">
                                    {service.description}
                                </Text>
                            </Card>
                        ))}
                    </Stack>

                    {/* Contact Section */}
                    <Card shadow="md" radius="md" p="lg" className={styles.contactCard}>
                        {/* @ts-ignore */}
                        <Text weight={700} size="lg" mb="sm">
                            Contactez-nous
                        </Text>
                        <Text size="sm" mb="md">
                            {contactInfo.address}
                        </Text>
                        <Text size="sm" mb="md">
                            Téléphone: {contactInfo.phone}
                        </Text>
                        <Text size="sm" mb="lg">
                            Email: {contactInfo.email}
                        </Text>

                        {/* Map */}
                        <img
                            src={contactInfo.mapImage}
                            alt="Map showing our location"
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                        />
                        {/* @ts-ignore */}
                        <Group position="center" mt="lg">
                            <Button color="blue" radius="md">
                                Envoyer un message
                            </Button>
                        </Group>
                    </Card>
                </SimpleGrid>
            </Container>
        </section>
    );
};
