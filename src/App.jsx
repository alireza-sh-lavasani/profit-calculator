import { Button, Container, Divider, Stack, TextField, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useRef, useState } from 'react'
import { NumericFormat } from 'react-number-format'

function App() {
  // Refs
  const duration = useRef()
  let monthlyAmount = useRef()
  const totalProfit = useRef()

  // State
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalInvestment, setTotalInvestment] = useState(0)
  const [showResults, setShowResults] = useState(false)

  // Calculate Profit
  const calculateProfit = () => {
    // Variables
    let totalBalance = 0
    const monthsCount = Number(duration.current.value) * 12
    const monthlyProfit = 1 + Number(totalProfit.current.value) / monthsCount / 100

    for (let i = 0; i < monthsCount; i++) {
      totalBalance *= monthlyProfit
      totalBalance += Number(monthlyAmount.current.value)
    }

    setTotalBalance(Math.round(totalBalance))
    setTotalInvestment(Math.round(monthsCount * Number(monthlyAmount.current.value)))
    setShowResults(true)
  }

  // Render
  return (
    <>
      <Container>
        <Typography variant='h3' gutterBottom mx={{ margin: '1rem auto' }}>
          Profit Calculator
        </Typography>

        <Divider sx={{ margin: '2rem 0' }} />

        <Stack gap={3}>
          <TextField inputRef={duration} variant='outlined' label='Duration (in years):' />
          <TextField inputRef={monthlyAmount} variant='outlined' label='Monthly Amount (in $):' />
          <TextField
            inputRef={totalProfit}
            variant='outlined'
            label='Total Profit  (in percentage):'
            helperText='e.g. for 120% total profit you enter 120'
          />
          <Button variant='contained' onClick={calculateProfit} sx={{ margin: '1rem 0' }}>
            Calculate
          </Button>

          <Divider sx={{ margin: '1rem 0' }} />

          {showResults ? (
            <Stack>
              <Grid2 container spacing={2}>
                <Grid2>
                  <Typography variant='overline'>Total Investment: </Typography>
                </Grid2>

                <Grid2>
                  <Typography variant='button'>
                    <NumericFormat thousandSeparator=',' displayType='text' prefix='$' value={totalInvestment} />
                  </Typography>
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2}>
                <Grid2>
                  <Typography variant='overline'>Total Balance: </Typography>
                </Grid2>

                <Grid2>
                  <Typography variant='button'>
                    <NumericFormat thousandSeparator=',' displayType='text' prefix='$' value={totalBalance} />
                  </Typography>
                </Grid2>
              </Grid2>

              <Grid2 container spacing={2}>
                <Grid2>
                  <Typography variant='overline'>Total Profit: </Typography>
                </Grid2>

                <Grid2>
                  <Typography variant='button'>
                    <NumericFormat
                      thousandSeparator=','
                      displayType='text'
                      prefix='$'
                      value={totalBalance - totalInvestment}
                    />
                  </Typography>
                </Grid2>
              </Grid2>
            </Stack>
          ) : (
            <></>
          )}
        </Stack>
      </Container>
    </>
  )
}

export default App
