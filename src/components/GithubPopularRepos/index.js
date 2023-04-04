import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import './index.css'
import LanguageFilterItem from '../LanguageFilterItem'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

// Write your code here
const viewStatusList = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILED',
}

class GithubPopularRepos extends Component {
  state = {
    reposList: [],
    activeId: languageFiltersData[0].id,
    viewStatus: viewStatusList.initial,
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {activeId} = this.state
    this.setState({viewStatus: viewStatusList.inProgress})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeId}`
    const response = await fetch(url)
    if (response.ok) {
      const fetchedData = await response.json()
      const data = fetchedData.popular_repos.map(eachItem => ({
        name: eachItem.name,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        forksCount: eachItem.forks_count,
        starsCount: eachItem.stars_count,
        avatarUrl: eachItem.avatar_url,
      }))
      this.setState({
        reposList: data,
        viewStatus: viewStatusList.success,
      })
    } else {
      this.setState({viewStatus: viewStatusList.failure})
    }
  }

  onChangeId = id => {
    this.setState({activeId: id}, this.getRepos)
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {reposList} = this.state
    return (
      <ul className="repoListContainer">
        {reposList.map(each => (
          <RepositoryItem reposList={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLanguageList = () => {
    const {activeId} = this.state
    return (
      <ul className="languageListContainer">
        {languageFiltersData.map(eachItem => (
          <LanguageFilterItem
            key={eachItem.id}
            isActive={eachItem.id === activeId}
            languageList={eachItem}
            onChangeId={this.onChangeId}
          />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="error-message">Something Went Wrong</h1>
    </div>
  )

  renderView = () => {
    const {viewStatus} = this.state
    switch (viewStatus) {
      case viewStatusList.success:
        return this.renderSuccessView()
      case viewStatusList.failure:
        return this.renderFailureView()
      case viewStatusList.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageList()}
        {this.renderView()}
      </div>
    )
  }
}

export default GithubPopularRepos
