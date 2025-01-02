'use client'

import React from 'react';
import {
    Container,
    Card,
    Text,
    Group,
    Button,
    Grid,
} from '@mantine/core';
import styles from './GridPresentation.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export const GridPresentation = ({ services, contactInfo }: { services: any[]; contactInfo: any }) => {
    return (
        <section className={styles.section}>
            <Container my="md">
                <h1>Nos services</h1>
                <Grid gutter="lg">
                    <Grid.Col span={{ base: 12, sm: 6, lg: 7 }}>
                        {/* Services Section */}
                        {services.map((service, index) => (
                            <div className={styles.cardWrapper} key={index} >
                                <Link href={service.link} className={styles.link}>
                                    <Card shadow="md" radius="md" p="lg" className={styles.card}>
                                        <Group>
                                            <Image src={service.icon} alt={service.title} width='50' height='50' />
                                            <h2>{service.title}</h2>
                                        </Group>
                                        <Text size="sm" c="dimmed">
                                            {service.description}
                                        </Text>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </Grid.Col>

                    {/* Contact Section */}
                    <Grid.Col span={{ base: 12, sm: 6, lg: 5 }}>
                        <Card shadow="md" radius="md" p="lg" className={styles.card}>
                            <Group>
                                <Image src={contactInfo.icon} alt={contactInfo.title} width='50' height='50' />
                                <h2>{contactInfo.title}</h2>
                            </Group>
                            <Text size="sm" mb="md">
                                {contactInfo.address}
                            </Text>
                            <Text size="sm" mb="md">
                                {contactInfo.phone}
                            </Text>
                            <Text size="sm" mb="lg">
                                {contactInfo.email}
                            </Text>
                            <img
                                src={contactInfo.mapImage}
                                alt="Map showing our location"
                                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }}
                            />
                            <Group align="center" mt="lg">
                                <Button color="black" radius="md" component={Link} href={contactInfo.href}>
                                    {contactInfo.button}
                                </Button>
                            </Group>
                        </Card>
                    </Grid.Col>
                </Grid>
            </Container>
        </section>
    );
};
