import { Injectable } from '@angular/core';
import { Campaign } from './campaign.model';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class CampaignsService {
  campaigns: FirebaseListObservable<any[]>;

  constructor(private angularFire: AngularFire) {
    this.campaigns = angularFire.database.list('campaigns');
  }

  getCampaigns() {
    return this.campaigns;
  }

  addCampaign(newCampaign: Campaign) {
    this.campaigns.push(newCampaign);
  }

  getCampaignById(campaignId: string){
    return this.angularFire.database.object('campaigns/' + campaignId);
  }

  updateCampaign(localUpdatedCampaign) {
    var campaignEntryInFirebase = this.getCampaignById(localUpdatedCampaign.$key);
    campaignEntryInFirebase.update({title: localUpdatedCampaign.title,
                                    author: localUpdatedCampaign.author,
                                    description: localUpdatedCampaign.description,
                                    reward: localUpdatedCampaign.reward,
                                    goal: localUpdatedCampaign.goal,
                                    image: localUpdatedCampaign.image});
  }

  deleteCampaign(localCampaignToDelete) {
    var campaignEntryInFirebase = this.getCampaignById(localCampaignToDelete.$key);
    campaignEntryInFirebase.remove();
  }

}
