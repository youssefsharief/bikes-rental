import { InnerForm } from './InnerForm';
import { withFormik, } from 'formik';
import { ApiService } from '../../../services/data.service';
import bikeFormSchema from './validationSchema';
import { toast } from 'react-toastify';

export const EnhancedBikeForm = withFormik({
	mapPropsToValues: props => {
		return { model: props.bike.model, color: props.bike.color, weight: props.bike.weight, latitude: props.bike.location.coordinates[0], 
			longitude: props.bike.location.coordinates[1],  }
	},
	validationSchema: bikeFormSchema,
	mapValuesToPayload: x => {
		return x
	},
	handleSubmit: (values, { props, setSubmitting, setErrors }) => {
		ApiService.editBike(props.bike._id, values).then((payload) => {
			toast.success('Success')
			setSubmitting(false);
		}).catch(err => {
			setSubmitting(false)
			toast.error(err.data.msg)
		})
	},
	displayName: 'BikeForm',

})(InnerForm);