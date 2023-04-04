// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageList, onChangeId, isActive} = props
  const {id, language} = languageList

  const buttonStyle = isActive
    ? 'languageButton activeLanguageButton'
    : 'languageButton'

  const onClicked = () => {
    onChangeId(id)
    console.log('clicked')
  }
  return (
    <li className="languageListItem">
      <button className={buttonStyle} type="button" onClick={onClicked}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
