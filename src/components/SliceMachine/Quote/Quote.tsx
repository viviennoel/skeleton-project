import { Container, Group } from "@mantine/core";
import Image from "next/image";

export const Quote = ({ data }: { data: any }) => {
    console.log(data)
    return (
        <Container>
            <Group justify='center'>
                <Image width="48" height="48" src="https://img.icons8.com/fluency-systems-filled/c9a456/48/quote-left--v1.png" alt="quote-left--v1" />
                <h3><i>{data.text}</i></h3>
                <Image width="48" height="48" src="https://img.icons8.com/fluency-systems-filled/c9a456/48/quote-right--v1.png" alt="quote-left--v1" />
            </Group>
        </Container>
    )
}