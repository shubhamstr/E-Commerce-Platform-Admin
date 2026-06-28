// material-ui
import { Card, CardContent, Link, Stack, Typography } from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import branding from 'branding';

// ==============================|| DRAWER CONTENT - NAVIGATION CARD ||============================== //

const NavCard = () => {
  return (
    <Card sx={{ bgcolor: 'rgb(250, 250, 250)', border: '1px solid rgb(230, 235, 241)', m: 2 }}>
      <CardContent>
        <Stack alignItems="center" spacing={1.5}>
          <StorefrontIcon sx={{ fontSize: 40, color: 'primary.main' }} />
          <Stack alignItems="center">
            <Typography variant="h5">{branding.fullName}</Typography>
            <Typography variant="body2" color="secondary" textAlign="center" sx={{ mt: 0.5 }}>
              {branding.tagline}
            </Typography>
          </Stack>
          <Typography variant="caption" color="text.secondary" textAlign="center">
            Built by{' '}
            <Link href={branding.author.portfolioUrl} target="_blank" rel="noopener noreferrer" underline="hover">
              {branding.author.name}
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default NavCard;
