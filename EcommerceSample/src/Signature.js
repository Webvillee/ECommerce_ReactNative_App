import { View, Text, TouchableOpacity } from 'react-native'
import SignaturePad from '@envoy/react-native-signature-pad'



//var SignaturePad = require('react-native-signature-pad');
export default class Signature extends React.Component {
	
	    private pad: SignaturePad
		
  render() {
    return (
       <View style={{flex: 1}}>
                <SignaturePad
                    style={{width: 600, height: 200}}
                    color='red'
                    onChange={this.onChange}
                    ref={this.onRef}
                />
                <TouchableOpacity onPress={this.onClear}>
                    <Text>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCaptureBase64}>
                    <Text>Capture Base64</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onCaptureFile}>
                    <Text>Capture file</Text>
                </TouchableOpacity>
            </View>
    );
  }
	
	
		    private onRef = (ref: any) => {
        this.pad = ref
    }
    
    private onChange = (event: any) => {
        const { count, length } = event.nativeEvent
        console.log('Signature pad update', count, length)
    }
    
    private onClear = () => {
        this.pad.clear()
    }
		 private onCaptureBase64 = () => {
        this.pad.capture('base64', {})
            .then(data => {
                // handle image data here
            })
    }
    
    private onCaptureFile = () => {
        this.pad.capture('file', { path: '/path/to/file.png' })
            .then(_ => {
                // handle image file here
            })
    }
		
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sketch: {
    height: '50%',
  },
  image: {
    height: '50%',
    backgroundColor: 'orange',
  },
});