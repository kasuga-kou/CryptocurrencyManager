
import { connect } from 'react-redux';
import { Dispatch } from 'react';
import { ILocalState } from '../../redux/reducer';
import Index, { IProps } from './layout'

const mapStateToProps = (state: ILocalState, localProps: IProps) => ({ ...state, ...localProps })
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Index);
