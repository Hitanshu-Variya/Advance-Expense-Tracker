import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#000000',
  minHeight: '100vh',
  color: '#ffffff',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden'
}))

const Ball = styled('div')({
  position: 'absolute',
  borderRadius: '50%',
  filter: 'blur(60px)',
  opacity: 0.5,
  animation: 'float 15s infinite ease-in-out',
  zIndex: 0,
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translate(0, 0) rotate(0deg) scale(1)',
    },
    '50%': {
      transform: 'translate(150px, 100px) rotate(180deg) scale(1.2)',
    }
  }
})

const StyledCard = styled(Card)(() => ({
  backgroundColor: '#1a1a1a',
  color: '#ffffff',
  height: '100%',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  }
}))

const teamMembers = [
  {
    name: 'Variya Hitanshu',
    studentId: '202201510',
    email: '202201510@daiict.ac.in',
    image: '/Images/member_Hitanshu.jpg'
  },
  {
    name: 'Darshak Kukadiya',
    studentId: '202201180',
    email: '202201180@daiict.ac.in',
    image: '/Images/member_Darshak.jpg'
  },
  {
    name: 'vardhman Mehta',
    studentId: '202201444',
    email: '202201444@daiict.ac.in',
    image: '/Images/member_vardhaman.jpg'
  },
  {
    name: 'Adit Shah',
    studentId: '202201289',
    email: '202201289@daiict.ac.in',
    image: '/Images/member_Adit.jpg'
  },
  {
    name: 'Yatharth Bhatt',
    studentId: '202411077',
    email: '202411077@daiict.ac.in',
    image: '/Images/member_Yatharth.png'
  },
  
]

const ContactUs = () => {
  const navigate = useNavigate()

  return (
    <StyledBox>
      <Ball sx={{ 
        background: '#4a148c',
        width: '300px',
        height: '300px',
        top: '10%',
        left: '10%',
        opacity: 0.7,
        animationDelay: '0s'
      }} />
      <Ball sx={{ 
        background: '#311b92',
        width: '250px',
        height: '250px',
        bottom: '20%',
        right: '10%',
        animationDelay: '-5s'
      }} />
      <Ball sx={{ 
        background: '#1a237e',
        width: '200px',
        height: '200px',
        bottom: '10%',
        left: '20%',
        animationDelay: '-10s'
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Button 
          variant="outlined" 
          color="inherit" 
          onClick={() => navigate('/')}
          sx={{ mb: 3 }}
        >
          Back to Home
        </Button>

        <Box sx={{ textAlign: 'center', mb: 6 }}>   
          <div className="flex items-center justify-center gap-4">
            <img 
              src="/Images/Logo.png" 
              alt="Logo" 
              style={{ width: '120px', marginTop: '-20px' }}
            />
            <Typography variant="h2" component="h1" gutterBottom>
              Expense Flow
            <Typography className='text-xs' sx={{ mb: 2 }}>
              Effortless expense tracking
            </Typography>
            </Typography>
          </div>
        </Box>

        <Typography variant="h3" component="h2" sx={{ mb: 4, textAlign: 'center' }}>
          Contact Us
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={member.image}
                  alt={member.name}
                  sx={{
                    objectFit: 'cover',
                    height: '300px'
                  }}
                />  
                <CardContent className='flex flex-col justify-center items-center'>
                  <Typography variant="h4" gutterBottom>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Student ID: {member.studentId}
                  </Typography>
                  <Typography variant="body2">
                    Email: {member.email}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledBox>
  )
}

export default ContactUs