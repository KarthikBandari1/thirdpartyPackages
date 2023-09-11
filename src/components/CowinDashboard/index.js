import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

class CowinDashboard extends Component {
  state = {
    coverageData: [],
    GenderData: [],
    AgeData: [],
    apiStatus: 'loading',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({apiStatus: 'loading'})
    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const responseData = await response.json()
      const last7DaysVaccination = responseData.last_7_days_vaccination
      const VaccinationByAgeData = responseData.vaccination_by_age
      const VaccinationByGenderData = responseData.vaccination_by_gender
      this.setState({
        coverageData: last7DaysVaccination,
        GenderData: VaccinationByGenderData,
        AgeData: VaccinationByAgeData,
        apiStatus: 'success',
      })
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  renderData = () => {
    const {apiStatus, coverageData, AgeData, GenderData} = this.state
    switch (apiStatus) {
      case 'success':
        return (
          <div>
            <VaccinationCoverage coverageData={coverageData} />
            <VaccinationByAge AgeData={AgeData} />
            <VaccinationByGender GenderData={GenderData} />
          </div>
        )
      case 'failure':
        return (
          <div>
            <h1>Something went wrong</h1>
            <img
              src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
              alt="failure view"
            />
          </div>
        )
      case 'loading':
        return (
          <div data-testid="loader" className="products-loader-container">
            <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
          </div>
        )

      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
        />
        <h1>CoWin Vaccination in India</h1>
        {this.renderData()}
      </div>
    )
  }
}
export default CowinDashboard
