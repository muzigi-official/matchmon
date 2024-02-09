import { useState, useEffect } from 'react';

import { Stack, Box, Pagination } from '@mui/material';

import { useMatches, useLocation } from 'react-router-dom';

export default function Player() {
  const matches = useMatches();
  const playerId = matches[0].params.playerId;
  // const matches = useLocation();
  // console.log(matches);
  return <div></div>;
}
