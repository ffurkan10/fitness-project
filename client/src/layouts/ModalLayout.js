import { useSelector } from 'react-redux';
import ResultModal from '../components/modals/ResultModal';
import UserOptionModal from '../components/modals/userModals/UserOptionModal';
import AddNewUserModal from '../components/modals/userModals/AddNewUserModal';
import MembershipAddModal from '../components/modals/membershipModals/MembershipAddModal';
import MembershipUpdateModal from '../components/modals/membershipModals/MembershipUpdateModal';
import NutritionAddModal from '../components/modals/nutritionModals/NutritionAddModal';
import NutritionUpdateModal from '../components/modals/nutritionModals/NutritionUpdateModal';
import BodyFeatureAddModal from '../components/modals/bodyFeatureModals/BodyFeatureAddModal';
import BodyFeatureUpdateModal from '../components/modals/bodyFeatureModals/BodyFeatureUpdateModal';

const ModalLayout = () => {

    const { modalType, nestedModalType } = useSelector((state) => state.modal);


  return (
    <>
        {modalType === "result" && <ResultModal />}

        {modalType === "addNewUser" && <AddNewUserModal />}
  
        {modalType === "userOption" && <UserOptionModal />}


        {modalType === "addMembership" && <MembershipAddModal />}
        {modalType === "updateMembership" && <MembershipUpdateModal />}

        {modalType === "addNutrition" && <NutritionAddModal />}
        {modalType === "updateNutrition" && <NutritionUpdateModal />}

        {modalType === "addBodyFeature" && <BodyFeatureAddModal />}
        {modalType === "updateBodyFeature" && <BodyFeatureUpdateModal />}
    </>
  )
}

export default ModalLayout