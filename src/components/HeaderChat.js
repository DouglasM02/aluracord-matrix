import {
  Box, Button, Text,
} from '@skynexui/components';

export default function HeaderChat(props) {
  return (
    <Box styleSheet={{
      width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}
    >
      <Text variant="heading5">
        Chat
      </Text>
      <Button
        variant="primary"
        colorVariant="negative"
        label="Sair"
        href="/"
      />
    </Box>
  );
}
