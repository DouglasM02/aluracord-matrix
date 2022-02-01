import {
    Box, Button, Text, TextField, Image,
} from '@skynexui/components';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import appConfig from '../config.json';
import travellerWalking from '../src/lottie/traveller-walking.json';

export default function Custom404() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: travellerWalking,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <Box
            styleSheet={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                flexDirection: 'column',
                padding: '30px',
                backgroundColor: appConfig.theme.colors.primary['700'],
            }}
        >
            <Text
                styleSheet={{
                    marginTop: '30px',
                    marginBottom: '30px',
                    marginHorizontal: 'auto',
                    color: appConfig.theme.colors.tertiary['700'],
                }}
                variant="body1"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2 }}
                >
                    <strong>Ops, não foi possivel encontrar esta praia!</strong>
                </motion.div>
            </Text>

            <Lottie
                options={defaultOptions}
                height={400}
                width={400}
            />
        </Box>
    );
}
