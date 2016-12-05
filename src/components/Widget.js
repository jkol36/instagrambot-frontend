import React, {PropTypes} from 'react';

const Widget = (props) => (
    <div className='widget'>
      <div className={`widget-header bg-${props.color}`}>
        <i className={`widget-icon fa fa-${props.icon}`}/>
        <span className='widget-caption'> {props.caption} </span>
        <div className='widget-buttons'>
          {!props.widgetHeaderButtons ? null: props.widgetHeaderButtons.map((button, index) => {
            return (
              <a href={button.link} key={index} onClick={button.onClick} data-toggle={button.dataToggle}>
                <i data-tip={button.dataTip} className={`fa fa-${button.icon}`}></i>
              </a>
            )
          })}
        </div>
      </div>
      <div className='widget-body'> 
        {props.children}
      </div>
    </div>
)

Widget.propTypes = {
  widgetHeaderButtons: PropTypes.array,
  widgetButton: PropTypes.object,
  widgetButtonLink: PropTypes.string,
  widgetButtonDataToggle: PropTypes.string,
  widgetButtonIcon:PropTypes.string,
  buttonOnClick:PropTypes.onClick,
  buttonDataTip:PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string,
  texts: PropTypes.array,
  caption: PropTypes.string,
  value: PropTypes.string
}

export default Widget