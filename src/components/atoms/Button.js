import React from 'react';
import { View } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { Grid , Col, Row } from 'react-native-easy-grid';
import { PropTypes } from 'prop-types';

const containerStyle = {
    flex:1,
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignContent: "center",
    justifyContent:"center"

}

/** 
 * @param container for container styling, default styles are in the above "containerStyle"
 * @param title     to set the title of the button
 * @param style     button style(added for separation of different styles)
 * @param icon      icon name prop of the *Native Base* <Icon/> component (required for icon buttons)
 * @param iconType  type prop of the *Native Base* <Icon/> component (optional with icon buttons refer Native Base docs)
 * @param hasIcon   required when using an iconButton 
 *                  (NOTE: this property is mandatory, also include iconLeft for proper spacing)
 * @param iconOnly  to omit the text and create an icon Only button
 * @param iconStyle use this property to add custom styles to the icon
 * @param icRight   flag to render an icon button with icon placed on the right side of the text
 *                  (NOTE: this prop must be used along with iconRight prop)
 * @param textStyle use this prop to provide custom styling to the button text
*/

export default function CButton({container = containerStyle, title = "Button", style,icon = null,
                                iconType = null,hasIcon = false, iconOnly=false,iconStyle=null, 
                                textStyle=null, icRight= false,...rest}) 
{
    
    return(
        <Grid style = {container}>
            <Button style = {style} {...rest}>
                {
                (hasIcon && !iconOnly)?
                    (
                    (!icRight)?
                    (
                        <>
                            <Icon name={icon} type={iconType} style={iconStyle} />
                            <Text style={textStyle}>{title}</Text>
                        </>
                    )
                    :
                    (
                        <>
                            <Text style={textStyle}>{title}</Text>
                            <Icon name={icon} type={iconType} style={iconStyle} />
                        </>
                    )
                ):
                (
                    hasIcon?
                    (<Icon name={icon} type={iconType} style={iconStyle} />)
                    :
                    (<Text style={textStyle}>{title}</Text>)
                )
                }
            </Button>
        </Grid>
    )
}

CButton.propTypes = {
    title: PropTypes.string,
    container: PropTypes.object
}
