// Alternative channels for submitting complaints/aspirations
export const alternativeChannels = [
  {
    id: 'facebook',
    name: 'Facebook',
    type: 'social',
    icon: 'facebook',
    contactInfo: '@gerindra',
    link: 'https://facebook.com/gerindra',
    description: 'Hubungi kami melalui Facebook Messenger'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    type: 'social',
    icon: 'instagram',
    contactInfo: '@gerindra',
    link: 'https://instagram.com/gerindra',
    description: 'Kirim DM melalui Instagram'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    type: 'social',
    icon: 'twitter',
    contactInfo: '@gerindra',
    link: 'https://twitter.com/gerindra',
    description: 'Tweet atau DM melalui Twitter/X'
  },
  // {
  //   id: 'whatsapp',
  //   name: 'WhatsApp',
  //   type: 'messaging',
  //   icon: 'whatsapp',
  //   contactInfo: '0811-2920-200',
  //   link: 'https://wa.me/6281129202000',
  //   description: 'Chat langsung via WhatsApp'
  // },
  {
    id: 'phone',
    name: 'Call Center',
    type: 'phone',
    icon: 'phone',
    contactInfo: '150945',
    link: 'tel:150945',
    description: 'Hubungi call center kami'
  },
  {
    id: 'email',
    name: 'Email',
    type: 'email',
    icon: 'email',
    contactInfo: 'aspirasi@gerindra.or.id',
    link: 'mailto:aspirasi@gerindra.or.id',
    description: 'Kirim email pengaduan/aspirasi'
  }
];

// Helper function to get channels by type
export const getChannelsByType = (type) => {
  return alternativeChannels.filter(channel => channel.type === type);
};

// Helper function to get social media channels
export const getSocialChannels = () => {
  return alternativeChannels.filter(channel => channel.type === 'social');
};

// Helper function to get direct contact channels
export const getDirectContactChannels = () => {
  return alternativeChannels.filter(channel =>
    channel.type === 'phone' || channel.type === 'email' || channel.type === 'messaging'
  );
};
